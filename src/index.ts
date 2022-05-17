import 'dotenv/config';
import { ColonyEvents } from '@colony/sdk';
import { Client, Intents } from 'discord.js';
import { providers } from 'ethers';
import fetch from 'node-fetch';

const { DISCORD_TOKEN } = process.env;

const provider = new providers.JsonRpcProvider('https://xdai.colony.io/rpc2/');
const colonyEvents = new ColonyEvents(provider);

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', async () => {
  console.info('Ready!');
  const chan = client.channels.cache.get('976078964583972924');

  const domainAdded = colonyEvents.createMultiFilter(
    colonyEvents.eventSources.Colony,
    'DomainAdded(address,uint256)',
    '0x6899e0775f56e078C4172B86D411a0623ccCaB24',
  );

  const domainMetadata = colonyEvents.createMultiFilter(
    colonyEvents.eventSources.Colony,
    'DomainMetadata(address,uint256,string)',
    '0x6899e0775f56e078C4172B86D411a0623ccCaB24',
  );

  let i = 0;
  colonyEvents.provider.on('block', async (no) => {
    i += 1;
    // Only get events every 5 blocks to debounce this a little bit
    if (i === 4) {
      const events = await colonyEvents.getMultiEvents(
        [domainAdded, domainMetadata],
        {
          fromBlock: no - i,
          toBlock: no,
        },
      );
      if (events.length) {
        if (chan?.isText()) {
          events.forEach(async (event) => {
            if (event.data.metadata) {
              console.info(event.data.metadata);
              chan.send(
                `We have domain metadata (IPFS CID: ${event.data.metadata}), fetching it right now...`,
              );
              try {
                // TODO: this doesn't work yet as IPFS takes too long to propagate. Add retries (will be done in ColonySDK)
                const res = await fetch(
                  `https://cloudflare-ipfs.com/ipfs/${event.data.metadata}`,
                );

                const { domainName, domainColor, domainPurpose } =
                  // TODO: type properly (will be done in ColonySDK)
                  (await res.json()) as any;
                chan.send(
                  `We have domain metadata: ${domainName}, ${domainColor}, ${domainPurpose}`,
                );
              } catch {
                console.error(
                  `Failed to fetch IPFS data in time for CID ${event.data.metadata}`,
                );
              }
            } else {
              chan.send(
                `A domain with id ${events[0].data.domainId} was created on Colony ${events[0].address}`,
              );
            }
          });
        }
      }
      i = 0;
    }
  });
});

// Login to Discord with your client's token
client.login(DISCORD_TOKEN);
