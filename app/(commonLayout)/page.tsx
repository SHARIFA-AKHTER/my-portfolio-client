export const dynamic = "force-dynamic";
import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import ProjectsPage from "./projects/page";
import SkillsPage from "./skills/page";
import Hero from "../components/Hero";
import Testimonials from './../components/Home/Testimonials';
import FAQ from "./../components/Home/FAQ";




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

        {/* 6. Testimonials Section */}
      <Testimonials />
      {/* 7. FAQ Section */}
      < FAQ />

      {/* Contact Section */}
      <section className="">
        <ContactPage />
      </section>

      {/* 9. Newsletter Section */}
      {/* <Newsletter /> */}
    </>
  );
}
