import { EventSources, EventSource } from '@colony/sdk';

interface EventDescription<T extends EventSource> {
  signature: keyof T['filters'];
}

const createEventMap = <T, D extends keyof EventSources>(
  _eventSource: D,
  map: { [K in keyof T]: EventDescription<EventSources[D]> },
) => map;

export const ColonyNetworkEvents = createEventMap('ColonyNetwork', {
  // Common network events
  ColonyNetworkInitialised: {
    signature: 'ColonyNetworkInitialised(address)',
  },
  ColonyAdded: {
    signature: 'ColonyAdded(uint256,address,address)',
  },
  SkillAdded: {
    signature: 'SkillAdded(uint256,uint256)',
  },
  TokenAuthorityDeployed: {
    signature: 'TokenAuthorityDeployed(address)',
  },
  TokenDeployed: {
    signature: 'TokenDeployed(address)',
  },
  // Less common network events
  TokenLockingAddressSet: {
    signature: 'TokenLockingAddressSet(address)',
  },
  MiningCycleResolverSet: {
    signature: 'MiningCycleResolverSet(address)',
  },
  NetworkFeeInverseSet: {
    signature: 'NetworkFeeInverseSet(uint256)',
  },
  ColonyVersionAdded: {
    signature: 'ColonyVersionAdded(uint256,address)',
  },
  MetaColonyCreated: {
    signature: 'MetaColonyCreated(address,address,uint256)',
  },
  AuctionCreated: {
    signature: 'AuctionCreated(address,address,uint256)',
  },
  ReputationMiningInitialised: {
    signature: 'ReputationMiningInitialised(address)',
  },
  ReputationMiningCycleComplete: {
    signature: 'ReputationMiningCycleComplete(bytes32,uint256)',
  },
  ReputationRootHashSet: {
    signature: 'ReputationRootHashSet(bytes32,uint256,address[],uint256)',
  },
  UserLabelRegistered: {
    signature: 'UserLabelRegistered(address,bytes32)',
  },
  ColonyLabelRegistered: {
    signature: 'ColonyLabelRegistered(address,bytes32)',
  },
  RecoveryRoleSet: {
    signature: 'RecoveryRoleSet(address,bool)',
  },
  ExtensionAddedToNetwork: {
    signature: 'ExtensionAddedToNetwork(bytes32,uint256)',
  },
  ExtensionDeprecated: {
    signature: 'ExtensionDeprecated(bytes32,address,bool)',
  },
  ExtensionInstalled: {
    signature: 'ExtensionInstalled(bytes32,address,uint256)',
  },
  ExtensionUninstalled: {
    signature: 'ExtensionUninstalled(bytes32,address)',
  },
  ExtensionUpgraded: {
    signature: 'ExtensionUpgraded(bytes32,address,uint256)',
  },
  RecoveryModeEntered: {
    signature: 'RecoveryModeEntered(address)',
  },
  RecoveryModeExitApproved: {
    signature: 'RecoveryModeExitApproved(address)',
  },
  RecoveryModeExited: {
    signature: 'RecoveryModeExited(address)',
  },
  RecoveryStorageSlotSet: {
    signature: 'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)',
  },
  RegistrarInitialised: {
    signature: 'RegistrarInitialised(address,bytes32)',
  },
  ReputationMinerPenalised: {
    signature: 'ReputationMinerPenalised(address,uint256)',
  },
  ReputationMiningRewardSet: {
    signature: 'ReputationMiningRewardSet(uint256)',
  },
  TokenWhitelisted: {
    signature: 'TokenWhitelisted(address,bool)',
  },
  MetaTransactionExecuted: {
    signature: 'MetaTransactionExecuted(address,address,bytes)',
  },
});

/* eslint-disable max-len */
export const ColonyEvents = createEventMap('Colony', {
  // Common Colony events
  DomainAdded: {
    signature: 'DomainAdded(address,uint256)',
  },
  DomainMetadata: {
    signature: 'DomainMetadata(address,uint256,string)',
  },
  ColonyInitialised: {
    signature: 'ColonyInitialised(address,address,address)',
  },
  ColonyFundsMovedBetweenFundingPots: {
    signature:
      'ColonyFundsMovedBetweenFundingPots(address,uint256,uint256,uint256,address)',
  },
  ColonyFundsClaimed: {
    signature: 'ColonyFundsClaimed(address,address,uint256,uint256)',
  },
  RewardPayoutCycleStarted: {
    signature: 'RewardPayoutCycleStarted(address,uint256)',
  },
  RewardPayoutCycleEnded: {
    signature: 'RewardPayoutCycleEnded(address,uint256)',
  },
  RewardPayoutClaimed: {
    signature: 'RewardPayoutClaimed(uint256,address,uint256,uint256)',
  },
  PaymentAdded: {
    signature: 'PaymentAdded(address,uint256)',
  },
  TaskAdded: {
    signature: 'TaskAdded(address,uint256)',
  },
  TaskBriefSet: {
    signature: 'TaskBriefSet(uint256,bytes32)',
  },
  TaskDueDateSet: {
    signature: 'TaskDueDateSet(uint256,uint256)',
  },
  TaskDomainSet: {
    signature: 'TaskDomainSet(uint256,uint256)',
  },
  TaskSkillSet: {
    signature: 'TaskSkillSet(uint256,uint256)',
  },
  TaskRoleUserSet: {
    signature: 'TaskRoleUserSet(uint256,uint8,address)',
  },
  TaskPayoutSet: {
    signature: 'TaskPayoutSet(uint256,uint8,address,uint256)',
  },
  TaskDeliverableSubmitted: {
    signature: 'TaskDeliverableSubmitted(address,uint256,bytes32)',
  },
  TaskCompleted: {
    signature: 'TaskCompleted(address,uint256)',
  },
  TaskWorkRatingRevealed: {
    signature: 'TaskWorkRatingRevealed(address,uint256,uint8,uint8)',
  },
  TaskFinalized: {
    signature: 'TaskFinalized(address,uint256)',
  },
  PayoutClaimed: {
    signature: 'PayoutClaimed(address,uint256,address,uint256)',
  },
  TaskCanceled: {
    signature: 'TaskCanceled(uint256)',
  },
  ExpenditureAdded: {
    signature: 'ExpenditureAdded(address,uint256)',
  },
  ExpenditureTransferred: {
    signature: 'ExpenditureTransferred(address,uint256,address)',
  },
  ExpenditureCancelled: {
    signature: 'ExpenditureCancelled(address,uint256)',
  },
  ExpenditureFinalized: {
    signature: 'ExpenditureFinalized(address,uint256)',
  },
  ExpenditureRecipientSet: {
    signature: 'ExpenditureRecipientSet(address,uint256,uint256,address)',
  },
  ExpenditureSkillSet: {
    signature: 'ExpenditureSkillSet(address,uint256,uint256,uint256)',
  },
  ExpenditurePayoutSet: {
    signature: 'ExpenditurePayoutSet(address,uint256,uint256,address,uint256)',
  },
  Annotation: {
    signature: 'Annotation(address,bytes32,string)',
  },
  PaymentFinalized: {
    signature: 'PaymentFinalized(address,uint256)',
  },
  PaymentPayoutSet: {
    signature: 'PaymentPayoutSet(address,uint256,address,uint256)',
  },
  PaymentRecipientSet: {
    signature: 'PaymentRecipientSet(address,uint256,address)',
  },
  PaymentSkillSet: {
    signature: 'PaymentSkillSet(address,uint256,uint256)',
  },
  ColonyFundingRoleSet: {
    signature: 'ColonyFundingRoleSet(address,bool)',
  },
  ColonyAdministrationRoleSet: {
    signature: 'ColonyAdministrationRoleSet(address,bool)',
  },
  ColonyArchitectureRoleSet: {
    signature: 'ColonyArchitectureRoleSet(address,bool)',
  },
  ColonyRootRoleSet: {
    signature: 'ColonyRootRoleSet(address,bool)',
  },
  // Less common Colony events
  ColonyBootstrapped: {
    signature: 'ColonyBootstrapped(address,address[],int256[])',
  },
  ColonyUpgraded: {
    signature: 'ColonyUpgraded(address,uint256,uint256)',
  },
  ColonyRoleSet: {
    signature: 'ColonyRoleSet(address,address,uint256,uint8,bool)',
  },
  ColonyRewardInverseSet: {
    signature: 'ColonyRewardInverseSet(address,uint256)',
  },
  FundingPotAdded: {
    signature: 'FundingPotAdded(uint256)',
  },
  RecoveryRoleSet: {
    signature: 'RecoveryRoleSet(address,bool)',
  },
  ColonyMetadata: {
    signature: 'ColonyMetadata(address,string)',
  },
  RecoveryModeEntered: {
    signature: 'RecoveryModeEntered(address)',
  },
  RecoveryModeExitApproved: {
    signature: 'RecoveryModeExitApproved(address)',
  },
  RecoveryModeExited: {
    signature: 'RecoveryModeExited(address)',
  },
  RecoveryStorageSlotSet: {
    signature: 'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)',
  },
  TaskChangedViaSignatures: {
    signature: 'TaskChangedViaSignatures(address[])',
  },
  TokenUnlocked: {
    signature: 'TokenUnlocked(address)',
  },
  TokensBurned: {
    signature: 'TokensBurned(address,address,uint256)',
  },
  TokensMinted: {
    signature: 'TokensMinted(address,address,uint256)',
  },
  ArbitraryReputationUpdate: {
    signature: 'ArbitraryReputationUpdate(address,address,uint256,int256)',
  },
  ExpenditureClaimDelaySet: {
    signature: 'ExpenditureClaimDelaySet(address,uint256,uint256,uint256)',
  },
  ExpenditureGlobalClaimDelaySet: {
    signature: 'ExpenditureGlobalClaimDelaySet(address,uint256)',
  },
  ExpenditureLocked: {
    signature: 'ExpenditureLocked(address,uint256)',
  },
  ExpenditureMetadataSet: {
    signature: 'ExpenditureMetadataSet(address,uint256,string)',
  },
  ExpenditurePayoutModifierSet: {
    signature: 'ExpenditurePayoutModifierSet(address,uint256,uint256,int256)',
  },
  ColonyMetadataDelta: {
    signature: 'ColonyMetadataDelta(address,string)',
  },
  DomainDeprecated: {
    signature: 'DomainDeprecated(address,uint256,bool)',
  },
  LocalSkillAdded: {
    signature: 'LocalSkillAdded(address,uint256)',
  },
  LocalSkillDeprecated: {
    signature: 'LocalSkillDeprecated(address,uint256,bool)',
  },
  MetaTransactionExecuted: {
    signature: 'MetaTransactionExecuted(address,address,bytes)',
  },
});
/* eslint-enable max-len */

export const OneTxPaymentEvents = createEventMap('OneTxPayment', {
  OneTxPaymentMade: {
    signature: 'OneTxPaymentMade(address,uint256,uint256)',
  },
});

export const VotingReputationEvents = createEventMap('VotingReputation', {
  ExtensionInitialised: {
    signature: 'ExtensionInitialised()',
  },
  LogSetAuthority: {
    signature: 'LogSetAuthority(address)',
  },
  LogSetOwner: {
    signature: 'LogSetOwner(address)',
  },
  MotionCreated: {
    signature: 'MotionCreated(uint256,address,uint256)',
  },
  MotionEscalated: {
    signature: 'MotionEscalated(uint256,address,uint256,uint256)',
  },
  MotionEventSet: {
    signature: 'MotionEventSet(uint256,uint256)',
  },
  MotionFinalized: {
    signature: 'MotionFinalized(uint256,bytes,bool)',
  },
  MotionRewardClaimed: {
    signature: 'MotionRewardClaimed(uint256,address,uint256,uint256)',
  },
  MotionStaked: {
    signature: 'MotionStaked(uint256,address,uint256,uint256)',
  },
  MotionVoteRevealed: {
    signature: 'MotionVoteRevealed(uint256,address,uint256)',
  },
  MotionVoteSubmitted: {
    signature: 'MotionVoteSubmitted(uint256,address)',
  },
  MetaTransactionExecuted: {
    signature: 'MetaTransactionExecuted(address,address,bytes)',
  },
});
