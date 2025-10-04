import SkillCard from "@/app/components/SkillCard";
import {
  SiJavascript,
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPrisma,
  SiNodedotjs,
  SiExpress,
  SiRedux,
  SiPostgresql,
  SiMongodb,
  SiMongoose,
  SiFirebase,
} from "react-icons/si";

const skills = [
  { skill: "Javascript", level: "Advanced", Icon: SiJavascript },
  { skill: "React", level: "Advanced", Icon: SiReact },
  { skill: "NextJS", level: "Advanced", Icon: SiNextdotjs },
  { skill: "TypeScript", level: "Intermediate", Icon: SiTypescript },
  { skill: "Tailwind CSS", level: "Advanced", Icon: SiTailwindcss },
  { skill: "Prisma", level: "Intermediate", Icon: SiPrisma },
  { skill: "NodeJS", level: "Advanced", Icon: SiNodedotjs },
  { skill: "ExpressJS", level: "Advanced", Icon: SiExpress },
  { skill: "Redux", level: "Intermediate", Icon: SiRedux },
  { skill: "Postgresql", level: "Intermediate", Icon: SiPostgresql },
  { skill: "MongoDB", level: "Advanced", Icon: SiMongodb },
  { skill: "Mongoose", level: "Intermediate", Icon: SiMongoose },
  { skill: "Firebase", level: "Intermediate", Icon: SiFirebase },
];

const SkillsPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">My Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {skills.map((item, index) => (
          <SkillCard
            key={index}
            skill={item.skill}
            level={item.level}
            Icon={item.Icon}
          />
        ))}
      </div>
    </div>
  );
};

export default SkillsPage;
