import { EventSources, EventSource } from '@colony/sdk';

interface EventDescription<T extends EventSource> {
  signature: keyof T['filters'];
  auxiliaryEvent?: true;
  connectedEvents?: Array<keyof T['filters']>;
}

type EventMap = {
  [S in keyof EventSources]: {
    [K in keyof EventSources[S]['filters']]?: EventDescription<EventSources[S]>;
  };
};

// event signature needs to be the key. Maybe it will be easier to type then
export const EVENTS: EventMap = {
  ColonyNetwork: {
    // Common network events
    'ColonyNetworkInitialised(address)': {
      signature: 'ColonyNetworkInitialised(address)',
    },
    'ColonyAdded(uint256,address,address)': {
      signature: 'ColonyAdded(uint256,address,address)',
    },
    'SkillAdded(uint256,uint256)': {
      signature: 'SkillAdded(uint256,uint256)',
    },
    'TokenAuthorityDeployed(address)': {
      signature: 'TokenAuthorityDeployed(address)',
    },
    'TokenDeployed(address)': {
      signature: 'TokenDeployed(address)',
    },
    // Less common network events
    'TokenLockingAddressSet(address)': {
      signature: 'TokenLockingAddressSet(address)',
    },
    'MiningCycleResolverSet(address)': {
      signature: 'MiningCycleResolverSet(address)',
    },
    'NetworkFeeInverseSet(uint256)': {
      signature: 'NetworkFeeInverseSet(uint256)',
    },
    'ColonyVersionAdded(uint256,address)': {
      signature: 'ColonyVersionAdded(uint256,address)',
    },
    'MetaColonyCreated(address,address,uint256)': {
      signature: 'MetaColonyCreated(address,address,uint256)',
    },
    'AuctionCreated(address,address,uint256)': {
      signature: 'AuctionCreated(address,address,uint256)',
    },
    'ReputationMiningInitialised(address)': {
      signature: 'ReputationMiningInitialised(address)',
    },
    'ReputationMiningCycleComplete(bytes32,uint256)': {
      signature: 'ReputationMiningCycleComplete(bytes32,uint256)',
    },
    'ReputationRootHashSet(bytes32,uint256,address[],uint256)': {
      signature: 'ReputationRootHashSet(bytes32,uint256,address[],uint256)',
    },
    'UserLabelRegistered(address,bytes32)': {
      signature: 'UserLabelRegistered(address,bytes32)',
    },
    'ColonyLabelRegistered(address,bytes32)': {
      signature: 'ColonyLabelRegistered(address,bytes32)',
    },
    'RecoveryRoleSet(address,bool)': {
      signature: 'RecoveryRoleSet(address,bool)',
    },
    'ExtensionAddedToNetwork(bytes32,uint256)': {
      signature: 'ExtensionAddedToNetwork(bytes32,uint256)',
    },
    'ExtensionDeprecated(bytes32,address,bool)': {
      signature: 'ExtensionDeprecated(bytes32,address,bool)',
    },
    'ExtensionInstalled(bytes32,address,uint256)': {
      signature: 'ExtensionInstalled(bytes32,address,uint256)',
    },
    'ExtensionUninstalled(bytes32,address)': {
      signature: 'ExtensionUninstalled(bytes32,address)',
    },
    'ExtensionUpgraded(bytes32,address,uint256)': {
      signature: 'ExtensionUpgraded(bytes32,address,uint256)',
    },
    'RecoveryModeEntered(address)': {
      signature: 'RecoveryModeEntered(address)',
    },
    'RecoveryModeExitApproved(address)': {
      signature: 'RecoveryModeExitApproved(address)',
    },
    'RecoveryModeExited(address)': {
      signature: 'RecoveryModeExited(address)',
    },
    'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)': {
      signature: 'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)',
    },
    'RegistrarInitialised(address,bytes32)': {
      signature: 'RegistrarInitialised(address,bytes32)',
    },
    'ReputationMinerPenalised(address,uint256)': {
      signature: 'ReputationMinerPenalised(address,uint256)',
    },
    'ReputationMiningRewardSet(uint256)': {
      signature: 'ReputationMiningRewardSet(uint256)',
    },
    'TokenWhitelisted(address,bool)': {
      signature: 'TokenWhitelisted(address,bool)',
    },
    'MetaTransactionExecuted(address,address,bytes)': {
      signature: 'MetaTransactionExecuted(address,address,bytes)',
    },
  },
  Colony: {
    // Common Colony events
    'DomainAdded(address,uint256)': {
      signature: 'DomainAdded(address,uint256)',
      connectedEvents: ['DomainMetadata', 'Annotation'],
    },
    'DomainMetadata(address,uint256,string)': {
      signature: 'DomainMetadata(address,uint256,string)',
      auxiliaryEvent: true,
    },
    'ColonyInitialised(address,address,address)': {
      signature: 'ColonyInitialised(address,address,address)',
    },
    // eslint-disable-next-line max-len
    'ColonyFundsMovedBetweenFundingPots(address,uint256,uint256,uint256,address)':
      {
        signature:
          // eslint-disable-next-line max-len
          'ColonyFundsMovedBetweenFundingPots(address,uint256,uint256,uint256,address)',
      },
    'ColonyFundsClaimed(address,address,uint256,uint256)': {
      signature: 'ColonyFundsClaimed(address,address,uint256,uint256)',
    },
    'RewardPayoutCycleStarted(address,uint256)': {
      signature: 'RewardPayoutCycleStarted(address,uint256)',
    },
    'RewardPayoutCycleEnded(address,uint256)': {
      signature: 'RewardPayoutCycleEnded(address,uint256)',
    },
    'RewardPayoutClaimed(uint256,address,uint256,uint256)': {
      signature: 'RewardPayoutClaimed(uint256,address,uint256,uint256)',
    },
    'PaymentAdded(address,uint256)': {
      signature: 'PaymentAdded(address,uint256)',
    },
    'TaskAdded(address,uint256)': {
      signature: 'TaskAdded(address,uint256)',
    },
    'TaskBriefSet(uint256,bytes32)': {
      signature: 'TaskBriefSet(uint256,bytes32)',
    },
    'TaskDueDateSet(uint256,uint256)': {
      signature: 'TaskDueDateSet(uint256,uint256)',
    },
    'TaskDomainSet(uint256,uint256)': {
      signature: 'TaskDomainSet(uint256,uint256)',
    },
    'TaskSkillSet(uint256,uint256)': {
      signature: 'TaskSkillSet(uint256,uint256)',
    },
    'TaskRoleUserSet(uint256,uint8,address)': {
      signature: 'TaskRoleUserSet(uint256,uint8,address)',
    },
    'TaskPayoutSet(uint256,uint8,address,uint256)': {
      signature: 'TaskPayoutSet(uint256,uint8,address,uint256)',
    },
    'TaskDeliverableSubmitted(address,uint256,bytes32)': {
      signature: 'TaskDeliverableSubmitted(address,uint256,bytes32)',
    },
    'TaskCompleted(address,uint256)': {
      signature: 'TaskCompleted(address,uint256)',
    },
    'TaskWorkRatingRevealed(address,uint256,uint8,uint8)': {
      signature: 'TaskWorkRatingRevealed(address,uint256,uint8,uint8)',
    },
    'TaskFinalized(address,uint256)': {
      signature: 'TaskFinalized(address,uint256)',
    },
    'PayoutClaimed(address,uint256,address,uint256)': {
      signature: 'PayoutClaimed(address,uint256,address,uint256)',
    },
    'TaskCanceled(uint256)': {
      signature: 'TaskCanceled(uint256)',
    },
    'ExpenditureAdded(address,uint256)': {
      signature: 'ExpenditureAdded(address,uint256)',
    },
    'ExpenditureTransferred(address,uint256,address)': {
      signature: 'ExpenditureTransferred(address,uint256,address)',
    },
    'ExpenditureCancelled(address,uint256)': {
      signature: 'ExpenditureCancelled(address,uint256)',
    },
    'ExpenditureFinalized(address,uint256)': {
      signature: 'ExpenditureFinalized(address,uint256)',
    },
    'ExpenditureRecipientSet(address,uint256,uint256,address)': {
      signature: 'ExpenditureRecipientSet(address,uint256,uint256,address)',
    },
    'ExpenditureSkillSet(address,uint256,uint256,uint256)': {
      signature: 'ExpenditureSkillSet(address,uint256,uint256,uint256)',
    },
    'ExpenditurePayoutSet(address,uint256,uint256,address,uint256)': {
      signature:
        'ExpenditurePayoutSet(address,uint256,uint256,address,uint256)',
    },
    'Annotation(address,bytes32,string)': {
      signature: 'Annotation(address,bytes32,string)',
    },
    'PaymentFinalized(address,uint256)': {
      signature: 'PaymentFinalized(address,uint256)',
    },
    'PaymentPayoutSet(address,uint256,address,uint256)': {
      signature: 'PaymentPayoutSet(address,uint256,address,uint256)',
    },
    'PaymentRecipientSet(address,uint256,address)': {
      signature: 'PaymentRecipientSet(address,uint256,address)',
    },
    'PaymentSkillSet(address,uint256,uint256)': {
      signature: 'PaymentSkillSet(address,uint256,uint256)',
    },
    'ColonyFundingRoleSet(address,bool)': {
      signature: 'ColonyFundingRoleSet(address,bool)',
    },
    'ColonyAdministrationRoleSet(address,bool)': {
      signature: 'ColonyAdministrationRoleSet(address,bool)',
    },
    'ColonyArchitectureRoleSet(address,bool)': {
      signature: 'ColonyArchitectureRoleSet(address,bool)',
    },
    'ColonyRootRoleSet(address,bool)': {
      signature: 'ColonyRootRoleSet(address,bool)',
    },
    // Less common Colony events
    'ColonyBootstrapped(address,address[],int256[])': {
      signature: 'ColonyBootstrapped(address,address[],int256[])',
    },
    'ColonyUpgraded(address,uint256,uint256)': {
      signature: 'ColonyUpgraded(address,uint256,uint256)',
    },
    'ColonyRoleSet(address,address,uint256,uint8,bool)': {
      signature: 'ColonyRoleSet(address,address,uint256,uint8,bool)',
    },
    'ColonyRewardInverseSet(address,uint256)': {
      signature: 'ColonyRewardInverseSet(address,uint256)',
    },
    'FundingPotAdded(uint256)': {
      signature: 'FundingPotAdded(uint256)',
    },
    'RecoveryRoleSet(address,bool)': {
      signature: 'RecoveryRoleSet(address,bool)',
    },
    'ColonyMetadata(address,string)': {
      signature: 'ColonyMetadata(address,string)',
    },
    'RecoveryModeEntered(address)': {
      signature: 'RecoveryModeEntered(address)',
    },
    'RecoveryModeExitApproved(address)': {
      signature: 'RecoveryModeExitApproved(address)',
    },
    'RecoveryModeExited(address)': {
      signature: 'RecoveryModeExited(address)',
    },
    'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)': {
      signature: 'RecoveryStorageSlotSet(address,uint256,bytes32,bytes32)',
    },
    'TaskChangedViaSignatures(address[])': {
      signature: 'TaskChangedViaSignatures(address[])',
    },
    'TokenUnlocked(address)': {
      signature: 'TokenUnlocked(address)',
    },
    'TokensBurned(address,address,uint256)': {
      signature: 'TokensBurned(address,address,uint256)',
    },
    'TokensMinted(address,address,uint256)': {
      signature: 'TokensMinted(address,address,uint256)',
    },
    'ArbitraryReputationUpdate(address,address,uint256,int256)': {
      signature: 'ArbitraryReputationUpdate(address,address,uint256,int256)',
    },
    'ExpenditureClaimDelaySet(address,uint256,uint256,uint256)': {
      signature: 'ExpenditureClaimDelaySet(address,uint256,uint256,uint256)',
    },
    'ExpenditureGlobalClaimDelaySet(address,uint256)': {
      signature: 'ExpenditureGlobalClaimDelaySet(address,uint256)',
    },
    'ExpenditureLocked(address,uint256)': {
      signature: 'ExpenditureLocked(address,uint256)',
    },
    'ExpenditureMetadataSet(address,uint256,string)': {
      signature: 'ExpenditureMetadataSet(address,uint256,string)',
    },
    'ExpenditurePayoutModifierSet(address,uint256,uint256,int256)': {
      signature: 'ExpenditurePayoutModifierSet(address,uint256,uint256,int256)',
    },
    'ColonyMetadataDelta(address,string)': {
      signature: 'ColonyMetadataDelta(address,string)',
    },
    'DomainDeprecated(address,uint256,bool)': {
      signature: 'DomainDeprecated(address,uint256,bool)',
    },
    'LocalSkillAdded(address,uint256)': {
      signature: 'LocalSkillAdded(address,uint256)',
    },
    'LocalSkillDeprecated(address,uint256,bool)': {
      signature: 'LocalSkillDeprecated(address,uint256,bool)',
    },
    'MetaTransactionExecuted(address,address,bytes)': {
      signature: 'MetaTransactionExecuted(address,address,bytes)',
    },
  },
  OneTxPayment: {
    'OneTxPaymentMade(address,uint256,uint256)': {
      signature: 'OneTxPaymentMade(address,uint256,uint256)',
      // connectedEvents: [''],
    },
  },
  VotingReputation: {
    'ExtensionInitialised()': {
      signature: 'ExtensionInitialised()',
    },
    'LogSetAuthority(address)': {
      signature: 'LogSetAuthority(address)',
    },
    'LogSetOwner(address)': {
      signature: 'LogSetOwner(address)',
    },
    'MotionCreated(uint256,address,uint256)': {
      signature: 'MotionCreated(uint256,address,uint256)',
    },
    'MotionEscalated(uint256,address,uint256,uint256)': {
      signature: 'MotionEscalated(uint256,address,uint256,uint256)',
    },
    'MotionEventSet(uint256,uint256)': {
      signature: 'MotionEventSet(uint256,uint256)',
    },
    'MotionFinalized(uint256,bytes,bool)': {
      signature: 'MotionFinalized(uint256,bytes,bool)',
    },
    'MotionRewardClaimed(uint256,address,uint256,uint256)': {
      signature: 'MotionRewardClaimed(uint256,address,uint256,uint256)',
    },
    'MotionStaked(uint256,address,uint256,uint256)': {
      signature: 'MotionStaked(uint256,address,uint256,uint256)',
    },
    'MotionVoteRevealed(uint256,address,uint256)': {
      signature: 'MotionVoteRevealed(uint256,address,uint256)',
    },
    'MotionVoteSubmitted(uint256,address)': {
      signature: 'MotionVoteSubmitted(uint256,address)',
    },
    'MetaTransactionExecuted(address,address,bytes)': {
      signature: 'MetaTransactionExecuted(address,address,bytes)',
    },
  },
};
