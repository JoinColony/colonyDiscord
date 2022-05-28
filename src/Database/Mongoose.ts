import { ColonyEvent } from './Schema/colonyEvent';

/** Fetches all colonyAddress/eventName registered in database
 * @returns array of "colonyAddress/eventName"
 */
async function fetchColonyEvents(): Promise<string[]> {
  const colonyEvents = await ColonyEvent.find();
  if (colonyEvents) {
    const resp: string[] = [];
    colonyEvents.forEach((r) => {
      resp.push(r.colonyEvent);
    });
    return resp;
  }
  return [];
}

/** Fetches all "discordServer/discordChannel" combinations per "colonyAddress/eventName"
 * @returns array of "discordServer/discordChannel"
 */
async function fetchDiscordChannelsForColonyEvent(
  colonyAddress: string,
  eventName: string,
): Promise<string[]> {
  const ce = `${colonyAddress}/${eventName}`;
  const existingColonyEvent = await ColonyEvent.findOne({ colonyEvent: ce });
  if (existingColonyEvent) {
    return existingColonyEvent.discordServerChannels;
  }
  return [];
}

/** Creates "colonyAddress/eventName" document in ColonyEvent collection if it does not
 *  exist. Updates existing ColonyEvent document with "discordServer/discordChannel" -
 *  this is and addToSet operation to avoid duplication.
 */
async function createColonyEvent(
  colonyAddress: string,
  eventName: string,
  discordServer: string,
  discordChannel: string,
) {
  const ce = `${colonyAddress}/${eventName}`;
  const ds = `${discordServer}/${discordChannel}`;
  const existingColonyEvent = await ColonyEvent.findOne({ colonyEvent: ce });
  if (existingColonyEvent) {
    console.info(
      `Updating existing colonyEvent ${existingColonyEvent.colonyEvent}`,
    );
    existingColonyEvent.discordServerChannels.addToSet(ds);
    existingColonyEvent.save();
  } else {
    console.info(`Creating new colonyEvent ${ce}`);
    ColonyEvent.create({
      colonyEvent: ce,
      discordServerChannels: [ds],
    });
  }
}

export {
  fetchColonyEvents,
  fetchDiscordChannelsForColonyEvent,
  createColonyEvent,
};
