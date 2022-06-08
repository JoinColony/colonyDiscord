import mongoose from 'mongoose';

const colonyEventSchema = new mongoose.Schema({
  colonyAddress: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  discordChannels: [
    {
      type: String,
    },
  ],
});

const ColonyEvent = mongoose.model(
  'ColonyEvent',
  colonyEventSchema,
  'ColonyEvent',
);

export { ColonyEvent };
