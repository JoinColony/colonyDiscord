import { ColonyEvent } from './Schema/colonyEvent';

/** Fetches all colonyAddress topic combinations registered in database
 * @returns two arrays with unique values: 'addresses': string[], and 'topics': string[]
 */
async function fetchColonyEvents(): Promise<{
  addresses: string[];
  topics: string[];
}> {
  const colonyEvents = await ColonyEvent.find();
  const addresses = new Set<string>();
  const topics = new Set<string>();

  if (colonyEvents) {
    colonyEvents.forEach((r) => {
      addresses.add(r.colonyAddress);
      topics.add(r.topic);
    });
  }

  const resp = {
    addresses: Array.from(addresses),
    topics: Array.from(topics),
  };
  return resp;
}

/** Fetches "discordChannels" per "colonyAddress" and "topic" combination
 * @returns array of "discordServer/discordChannel"
 */
async function fetchDiscordChannelsForColonyEvent(
  address: string,
  topic: string,
): Promise<string[]> {
  const existingColonyEvent = await ColonyEvent.findOne({
    colonyAddress: address,
    topic,
  });
  if (existingColonyEvent) {
    return existingColonyEvent.discordChannels;
  }
  return [];
}

/** Creates document in ColonyEvent collection if it does not yet
 *  exist. Updates existing ColonyEvent document with "discordChannel" -
 *  this is and addToSet operation to avoid duplication.
 */
async function createColonyEvent(
  colonyAddress: string,
  topic: string,
  discordChannel: string,
) {
  const existingColonyEvent = await ColonyEvent.findOne({
    colonyAddress,
    topic,
  });
  if (existingColonyEvent) {
    console.info(
      `Updating existing colonyEvent ${existingColonyEvent.topic} for Colony ${existingColonyEvent.colonyAddress}`,
    );
    existingColonyEvent.discordChannels.addToSet(discordChannel);
    existingColonyEvent.save();
  } else {
    console.info(
      `Creating new colonyEvent ${topic} for Colony ${colonyAddress}`,
    );
    ColonyEvent.create({
      colonyAddress,
      topic,
      discordChannels: [discordChannel],
    });
  }
}

export {
  fetchColonyEvents,
  fetchDiscordChannelsForColonyEvent,
  createColonyEvent,
};
