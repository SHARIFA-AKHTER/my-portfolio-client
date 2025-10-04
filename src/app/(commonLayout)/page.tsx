import AboutPage from "./about/page";
import ContactPage from "./contact/page";
import ProjectsPage from "./projects/page";
import SkillsPage from "./skills/page";
import Hero from "../components/Hero";
import Features from "../components/Features";

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

// import AboutPage from "./(commonLayout)/about/page";
// import ContactPage from "./(commonLayout)/contact/page";
// import ProjectsPage from "./(commonLayout)/projects/page";
// import SkillsPage from "./(commonLayout)/skills/page";
// import Hero from "./components/Hero";

// export default function HomePage() {
//   return (
//     <main className="overflow-x-hidden ">
//       <section className="relative">
//         <Hero />
//       </section>

//       {/* About Section */}
//       <section className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white">
//         <AboutPage />
//       </section>

//       {/* Skills Section */}
//       <section className="bg-gray-50">
//         <SkillsPage />
//       </section>

//       {/* Projects Section */}
//       <section className="bg-gradient-to-b from-gray-100 to-gray-200">
//         <ProjectsPage />
//       </section>

//       {/* Contact Section */}
//       <section className="bg-gradient-to-b from-purple-900 via-purple-800 to-purple-700 text-white">
//         <ContactPage />
//       </section>
//     </main>
//   );
// }
