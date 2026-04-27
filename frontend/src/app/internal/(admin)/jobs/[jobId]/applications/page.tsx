import ApplicationsPage from "@/internal/sections/jobs/ApplicationsPage/ApplicationsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ jobId: string }>;
}) {
  const { jobId } = await params;
  return <ApplicationsPage jobId={jobId} />;
}