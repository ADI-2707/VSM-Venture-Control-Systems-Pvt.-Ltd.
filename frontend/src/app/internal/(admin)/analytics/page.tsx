"use client";

import { useRBACGuard } from "@/hooks/useRBACGuard";
import AnalyticsPage from "@/internal/sections/analytics/AnalyticsPage/AnalyticsPage";

export default function Page() {
  const { isAllowed, isLoading } = useRBACGuard();

  if (isLoading || !isAllowed) return null;

  return <AnalyticsPage />;
}