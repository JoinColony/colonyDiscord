import mongoose from 'mongoose';

const colonyEventSchema = new mongoose.Schema({
  colonyEvent: {
    type: String,
    required: true,
  },
  discordServerChannels: [
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
