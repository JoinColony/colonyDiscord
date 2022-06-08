import mongoose from 'mongoose';
import dotenv from 'dotenv';
import {
  fetchColonyEvents,
  fetchDiscordChannelsForColonyEvent,
  createColonyEvent,
} from './Database/Mongoose';

dotenv.config();

const mongoUrl: string = process.env.MONGO || '';

async function name() {
  mongoose.connect(mongoUrl, (err) => {
    if (err) {
      console.info(err.message);
      console.info(err);
    } else {
      console.info('Connected to MongoDb');
    }
  });

  // Filling DB
  await createColonyEvent('address1', 'TOPIC1', 'channel1');
  await createColonyEvent('address1', 'TOPIC2', 'channel1');
  await createColonyEvent('address2', 'TOPIC1', 'channel1');
  await createColonyEvent('address1', 'TOPIC1', 'channel3');
  await createColonyEvent('address4', 'TOPIC1', 'channel4');
  await createColonyEvent('address2', 'TOPIC1', 'channel2');
  await createColonyEvent('address2', 'TOPIC1', 'channel3');

  // Getting all colonies and topics in two arrays of unique values
  const events = await fetchColonyEvents();

  console.info(`colony events: ${JSON.stringify(events)}`);

  // Getting discord channels to post to about event
  const oneEventDiscords = await fetchDiscordChannelsForColonyEvent(
    'address2',
    'TOPIC1',
  );
  console.info(
    `Discord channels to post event 'address2', 'TOPIC1': ${oneEventDiscords}`,
  ); // expect result

  // Should return empty array
  const oneEventDiscordsNull = await fetchDiscordChannelsForColonyEvent(
    'AJAUJAI',
    'LOLOLASDasd',
  );
  console.info(
    `Discord channels to post event does not exist: ${oneEventDiscordsNull}`,
  ); // expect []
}

name();
