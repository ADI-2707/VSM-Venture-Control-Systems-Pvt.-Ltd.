import ApplicationHero from "@/sections/application/ApplicationHero/ApplicationHero";
import ApplicationGrid from "@/sections/application/ApplicationGrid/ApplicationGrid";
import Reveal from "@/components/Reveal/Reveal";

export default function ApplicationsPage() {
  return (
    <>
      <ApplicationHero />
      <Reveal>
        <ApplicationGrid />
      </Reveal>
    </>
  );
}