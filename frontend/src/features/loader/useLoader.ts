import { useEffect, useState } from "react";

export function useLoader() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vsm_loader_seen");

    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem("vsm_loader_seen", "true");
    }
  }, []);

  return { showLoader, setShowLoader };
}