import 'dotenv/config';
import { ColonyEventManager } from '@colony/sdk';
import { Client, Intents, Message } from 'discord.js';
import { providers } from 'ethers';

import { EVENTS } from './events';

const { DISCORD_TOKEN } = process.env;

const provider = new providers.JsonRpcProvider('https://xdai.colony.io/rpc2/');
const eventManager = new ColonyEventManager(provider);

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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
          let message: Message<boolean> | undefined;
          const domainAddedEvent = events.find(
            ({ eventName }) =>
              eventName ===
              // @ts-ignore: We're going to fix this
              EVENTS.Colony['DomainAdded(address,uint256)'].signature,
          );
          const domainMetadataEvent = events.find(
            ({ eventName }) =>
              eventName ===
              // @ts-ignore: We're going to fix this
              EVENTS.Colony['DomainMetadata(address,uint256,string)'].signature,
          );
          if (domainAddedEvent) {
            message = await chan.send(
              `A domain with id ${domainAddedEvent.data.domainId} was created on Colony ${domainAddedEvent.address}`,
            );
          }
          if (domainMetadataEvent?.getMetadata && message) {
            await message.edit(
              `A domain with id ${domainMetadataEvent.data.domainId} was created on Colony ${domainMetadataEvent.address}. Fetching its metadata...`,
            );
            const metadata = await domainMetadataEvent.getMetadata();
            if ('domainName' in metadata) {
              const { domainName, domainColor, domainPurpose } = metadata;
              message.edit(
                `A domain with id ${domainMetadataEvent.data.domainId} was created on Colony ${domainMetadataEvent.address}. Its name is ${domainName}, the color is ${domainColor} and the purpose given was: ${domainPurpose}`,
              );
            }
          }
        }
      }
    }
  });
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);
