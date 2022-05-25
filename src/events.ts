import { EventSources, EventSource } from '@colony/sdk';

interface EventDescription<T extends EventSource> {
  signature: keyof T['filters'];
}

const createEventMap = <T, D extends keyof EventSources>(
  _eventSource: D,
  map: { [K in keyof T]: EventDescription<EventSources[D]> },
) => map;

export const ColonyNetworkEvents = createEventMap('ColonyNetwork', {
  ColonyNetworkInitialised: {
    signature: 'ColonyNetworkInitialised(address)',
  },
  // ..
});

export const ColonyEvents = createEventMap('Colony', {
  DomainAdded: {
    signature: 'DomainAdded(address,uint256)',
  },
  DomainMetadata: {
    signature: 'DomainMetadata(address,uint256,string)',
  },
  // ..
});

export const OneTxPaymentEvents = createEventMap('OneTxPayment', {
  OneTxPaymentMade: {
    signature: 'OneTxPaymentMade(address,uint256,uint256)',
  },
});

export const VotingReputationEvents = createEventMap('VotingReputation', {
  MotionCreated: {
    signature: 'MotionCreated(uint256,address,uint256)',
  },
  // ..
});
