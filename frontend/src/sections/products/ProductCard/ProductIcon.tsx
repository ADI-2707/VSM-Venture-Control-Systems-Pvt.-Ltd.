export default function ProductIcon({ type }: { type: string }) {
  switch (type) {
    case "drives":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <rect x="4" y="4" width="16" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    case "motors":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    case "plc":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <circle cx="8" cy="12" r="1" fill="currentColor"/>
          <circle cx="12" cy="12" r="1" fill="currentColor"/>
          <circle cx="16" cy="12" r="1" fill="currentColor"/>
        </svg>
      );

    case "panels":
      return (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none">
          <rect x="5" y="3" width="14" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 7h8M8 11h8M8 15h5" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      );

    default:
      return null;
  }
}