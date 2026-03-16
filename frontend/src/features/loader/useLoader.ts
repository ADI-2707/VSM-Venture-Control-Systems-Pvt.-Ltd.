import { useState } from "react";

export function useLoader() {
  const [showLoader, setShowLoader] = useState(() => {
    if (typeof window === "undefined") return false;

    const hasVisited = sessionStorage.getItem("vsm_loader_seen");

    if (!hasVisited) {
      sessionStorage.setItem("vsm_loader_seen", "true");
      return true;
    }

    return false;
  });

  return { showLoader, setShowLoader };
}