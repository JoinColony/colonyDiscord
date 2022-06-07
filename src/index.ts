/* eslint-disable max-classes-per-file */
import 'dotenv/config';
import {
  ColonyEvent,
  ColonyEventManager,
  EventSource,
  AnyMetadataValue,
  utils,
} from '@colony/sdk';
import { Client, Intents, Message } from 'discord.js';
import { providers } from 'ethers';
import { v4 as uuidv4 } from 'uuid';

import { EVENTS, EVENT_GROUPS, EventDescription, EventKey } from './events';

const { DISCORD_TOKEN } = process.env;

const provider = new providers.JsonRpcProvider('https://xdai.colony.io/rpc2/');
const eventManager = new ColonyEventManager(provider);

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

class CachedEvent {
  readonly event: ColonyEvent;

  readonly timestamp: number;

  readonly description: EventDescription<EventSource>;

  readonly metadata?: Promise<AnyMetadataValue>;

  /** Discord message id */
  messageId?: number;

  private getGroupKey(eventName: string): string | undefined {
    if (!this.description.group) return undefined;
    const group = EVENT_GROUPS[this.description.group];
    const groupEventDescription = group?.events[eventName];
    if (!groupEventDescription) {
      return undefined;
    }
    const dataKey = groupEventDescription.keyId
      .map((idx) => this.event.data[idx] || '')
      .join(':');
    return [this.event.eventName, this.event.address, dataKey].join(':');
  }

  constructor(event: ColonyEvent, description: EventDescription<EventSource>) {
    this.event = event;
    this.timestamp = Date.now();
    this.description = description;
    if (event.getMetadata) {
      this.metadata = event.getMetadata();
    }
  }

  createKey(): string {
    if (!this.description.group) {
      return uuidv4();
    }
    // Fail safe if for some reason there was no group key found
    return this.getGroupKey(this.event.eventName) || uuidv4();
  }

  /** Get all keys from the event group that are not this event */
  getOtherGroupKeys(): string[] {
    if (!this.description.group) {
      return [];
    }
    const group = EVENT_GROUPS[this.description.group];
    if (!group.events) {
      return [];
    }
    return Object.keys(group.events)
      .filter((eventName) => eventName !== this.event.eventName)
      .map((eventName) => this.getGroupKey(eventName))
      .filter(utils.nonNullable);
  }

  getTxHash(): string {
    return this.event.transactionHash;
  }

  getData() {
    return this.event.data;
  }

  async getMetadata() {
    return this.metadata;
  }

  setMessageId(id: number) {
    this.messageId = id;
  }
}

// New events add to queue

class EventQueue {
  private pending: string[];

  private done: string[];

  private map: Map<string, CachedEvent>;

  // Map transaction hashes to keys. TX hashes are not necessarily unique
  // but oh well, that's what we chose to do for the Annotations
  private txMap: Map<string, string>;

  private maxDoneItems: number;

  constructor(maxDoneItems: number) {
    this.pending = [];
    this.done = [];
    this.map = new Map();
    this.txMap = new Map();
    this.maxDoneItems = maxDoneItems;
  }

  // FIXME:
  // have two lists with keys. One 'pending' and one 'done'
  // pending is not size limited
  // done has maximum size
  // events that were handled once are moved into done (it could still be that they are used later on for context)
  // events that are not done but are waiting might need to be on a special "waiting" queue?
  // new, pending, done queues?
  unshift(event: CachedEvent) {
    // If list would grow too big we remove the last element
    const key = event.createKey();
    const txHash = event.getTxHash();
    this.pending.unshift(key);
    this.map.set(key, event);
    this.txMap.set(txHash, key);
  }

  get(key: string) {
    return this.map.get(key);
  }

  pop() {
    const last = this.pending.pop();
    if (last) {
      // Clean up list if full
      while (this.done.length >= this.maxDoneItems) {
        const k = this.done.pop();
        if (k) {
          const txHash = this.map.get(k)?.getTxHash();
          this.map.delete(k);
          if (txHash) {
            this.txMap.delete(txHash);
          }
        }
      }
      this.done.unshift(last);
      return this.map.get(last);
    }
    return undefined;
  }

  // deferLast() {
  //   const last = this.pending.pop();
  //   if (last) {
  //     this.pending.unshift(last);
  //   }
  // }
  //
  // doneLast() {
  //   const last = this.pending.pop();
  //   if (last) {
  //     // Clean up list if full
  //     while (this.done.length >= this.maxDoneItems) {
  //       const k = this.done.pop();
  //       if (k) {
  //         const txHash = this.map.get(k)?.getTxHash();
  //         this.map.delete(k);
  //         if (txHash) {
  //           this.txMap.delete(txHash);
  //         }
  //       }
  //     }
  //     this.done.unshift(last);
  //   }
  // }

  getByTxHash(txHash: string): CachedEvent | undefined {
    const key = this.txMap.get(txHash);
    if (!key) return undefined;
    return this.map.get(key);
  }
}

const EVENT_QUEUE = new EventQueue(1000);

const handleEvent = (
  event: ColonyEvent,
  description: EventDescription<EventSource>,
) => {
  const cachedEvent = new CachedEvent(event, description);
  EVENT_QUEUE.unshift(cachedEvent);
};

const processNext = () => {
  const cachedEvent = EVENT_QUEUE.pop();
  if (!cachedEvent) {
    return;
  }
  const connectedEvents = cachedEvent
    .getOtherGroupKeys()
    .map((id) => EVENT_QUEUE.get(id));

  const data = connectedEvents.reduce(
    (allData, event) => ({
      ...allData,
      ...event?.getData(),
    }),
    {},
  );

  const msgId =
    cachedEvent.messageId ||
    connectedEvents.find((evt) => evt?.messageId)?.messageId;

  // FIXME: obviously these should be multiple message ids 🤦
  if (msgId) {
    // await discordEditMessage(msgId, '')
  }

  // FIXME: post event to discord here
  // const msgId = postDiscordMessage()

  // const metadata =
};

// When the client is ready, run this code (only once)
client.once('ready', async () => {
  console.info('Ready!');
  const chan = client.channels.cache.get('976078964583972924');

  const eventList = eventManager.createMultiFilter(
    eventManager.eventSources.Colony,
    [
      // @ts-ignore: We're going to fix this
      EVENTS.Colony['DomainAdded(address,uint256)'].signature,
      // @ts-ignore: We're going to fix this
      EVENTS.Colony['DomainMetadata(address,uint256,string)'].signature,
    ],
    '0x6899e0775f56e078C4172B86D411a0623ccCaB24',
  );

  let i = 0;
  eventManager.provider.on('block', async (no) => {
    i += 1;
    // Only get events every 5 blocks to debounce this a little bit
    if (i === 4) {
      i = 0;
      const events = await eventManager.getMultiEvents([eventList], {
        fromBlock: no - 4,
        toBlock: no,
      });
      if (events.length) {
        if (chan?.isText()) {
          events.forEach((event) => {
            const { eventSource, eventName } = event;
            // 1 Find the event in our event list. If it's not there, discard it!
            const eventDescription =
              EVENTS[eventSource] &&
              (EVENTS[eventSource][
                eventName as EventKey<typeof eventSource>
              ] as EventDescription<EventSource>);
            if (!eventDescription) return;

            // 2 If event is an Annotation, handle that separately
            if (event.eventName === 'Annotation(address,bytes32,string)') {
              // return handleAnnotation(event, eventProps);
            }

            // 3 Else handle the event the usual way
            handleEvent(event, eventDescription);
          });
        }
      }
    }
  });
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);
// {
//           let message: Message<boolean> | undefined;
//           const domainAddedEvent = events.find(
//             ({ eventName }) =>
//               eventName === EVENTS.Colony.DomainAdded.signature,
//           );
//           const domainMetadataEvent = events.find(
//             ({ eventName }) =>
//               eventName === EVENTS.Colony.DomainMetadata.signature,
//           );
//           if (domainAddedEvent) {
//             message = await chan.send(
//               `A domain with id ${domainAddedEvent.data.domainId} was created on Colony ${domainAddedEvent.address}`,
//             );
//           }
//           if (domainMetadataEvent?.getMetadata && message) {
//             await message.edit(
//               `A domain with id ${domainMetadataEvent.data.domainId} was created on Colony ${domainMetadataEvent.address}. Fetching its metadata...`,
//             );
//             const metadata = await domainMetadataEvent.getMetadata();
//             if ('domainName' in metadata) {
//               const { domainName, domainColor, domainPurpose } = metadata;
//               message.edit(
//                 `A domain with id ${domainMetadataEvent.data.domainId} was created on Colony ${domainMetadataEvent.address}. Its name is ${domainName}, the color is ${domainColor} and the purpose given was: ${domainPurpose}`,
//               );
//             }
//           }
//         }
//
