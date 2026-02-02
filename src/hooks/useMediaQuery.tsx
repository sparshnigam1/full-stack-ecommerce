import { useSyncExternalStore } from "react";

export default function useMediaQuery(query: string): boolean {
  const getSnapshot = () => window.matchMedia(query).matches;

  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener("change", callback);
    return () => media.removeEventListener("change", callback);
  };

  const getServerSnapshot = () => false; // SSR default (no mismatch)

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
