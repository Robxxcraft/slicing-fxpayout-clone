export interface FlagState {
  profile: boolean;
  bank: boolean;
};

export interface FlagExtendBrokerState extends FlagState {
  broker: boolean;
}

export interface LoadingState extends FlagState {
  general: boolean;
};

export interface LoadingExtendBrokerState extends LoadingState {
  broker: boolean;
}