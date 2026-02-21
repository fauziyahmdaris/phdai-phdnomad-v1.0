declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    __REACT_DEVTOOLS_GLOBAL_HOOK__?: any;
  }
}

export {};
