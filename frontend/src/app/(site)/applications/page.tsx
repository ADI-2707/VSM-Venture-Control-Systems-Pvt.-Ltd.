import ApplicationHero from "@/site/sections/application/ApplicationHero/ApplicationHero";
import ApplicationGrid from "@/site/sections/application/ApplicationGrid/ApplicationGrid";
import Reveal from "@/site/components/Reveal/Reveal";

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