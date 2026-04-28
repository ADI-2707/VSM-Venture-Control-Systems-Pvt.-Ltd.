import ApplicationsPage from "@/internal/sections/jobs/ApplicationsPage/ApplicationsPage";

type PageProps = {
  params: Promise<{
    jobId: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { jobId } = await params;

  const numericJobId = Number(jobId);

  if (!Number.isInteger(numericJobId) || numericJobId <= 0) {
    return <div>Invalid Job ID</div>;
  }

  return <ApplicationsPage jobId={numericJobId} />;
}