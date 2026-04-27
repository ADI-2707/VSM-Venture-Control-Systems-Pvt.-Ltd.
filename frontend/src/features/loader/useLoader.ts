import { useEffect, useState } from "react";

export function useLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vsm_loader_seen");
    if (!hasVisited) {
      sessionStorage.setItem("vsm_loader_seen", "true");
      setShowLoader(true);
    }
  }, []);

  return { showLoader, setShowLoader };
}