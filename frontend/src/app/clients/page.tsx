import ClientsGrid from "@/site/sections/clients/ClientsGrid/ClientsGrid";
import Reveal from "@/site/components/Reveal/Reveal";

export default function ClientsPage() {
  return (
    <>
      <Reveal>
        <ClientsGrid />
      </Reveal>
    </>
  );
}