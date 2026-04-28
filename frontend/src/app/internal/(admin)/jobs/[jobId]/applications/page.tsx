"use client";

import { useRBACGuard } from "@/hooks/useRBACGuard";
import ApplicationsPage from "@/internal/sections/jobs/ApplicationsPage/ApplicationsPage";

export default function Page({ params }: any) {
  const { isAllowed, isLoading } = useRBACGuard();

  if (isLoading || !isAllowed) return null;

  return <ApplicationsPage jobId={params.jobId} />;
}