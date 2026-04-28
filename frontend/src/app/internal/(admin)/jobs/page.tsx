"use client";

import { useRBACGuard } from "@/hooks/useRBACGuard";
import JobsPage from "@/internal/sections/jobs/JobsPage/JobsPage";

export default function Page() {
  const { isAllowed, isLoading } = useRBACGuard();

  if (isLoading || !isAllowed) return null;

  return <JobsPage />;
}