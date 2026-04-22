declare global {
  interface Window {
    Tawk_API?: {
      hideWidget: () => void;
      showWidget: () => void;
      onLoad: () => void;
      shutdown: () => void;
    };
    Tawk_LoadStart?: Date;
  }
}

export {};
