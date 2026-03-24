import { useEffect, useState } from "react";

export function useLoader() {
  const [showLoader, setShowLoader] = useState<boolean | null>(null);

  useEffect(() => {
    const hasVisited = sessionStorage.getItem("vsm_loader_seen");
    const shouldShow = !hasVisited;

    if (shouldShow) {
      sessionStorage.setItem("vsm_loader_seen", "true");
    }

    const id = setTimeout(() => {
      setShowLoader(shouldShow);
    }, 0);

    return () => clearTimeout(id);
  }, []);

  return { showLoader, setShowLoader };
}