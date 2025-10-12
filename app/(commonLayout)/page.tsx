export const dynamic = "force-dynamic";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import ProjectsPage from "./projects/page";
import SkillsPage from "./skills/page";
import Hero from "../components/Hero";

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="">
        <Hero />
      </section>

      {/* About Section */}
      <section className="">
        <AboutPage />
      </section>

      {/* <section className="">
        <Features />
      </section> */}

      {/* Skills Section */}
      <section className="">
        <SkillsPage />
      </section>

      {/* Projects Section */}
      <section className="">
        <ProjectsPage />
      </section>

      {/* Contact Section */}
      <section className="">
        <ContactPage />
      </section>
    </>
  );
}
