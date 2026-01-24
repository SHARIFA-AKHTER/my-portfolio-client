"use client";

import { motion } from "framer-motion";
import {
  SiJavascript, SiReact, SiNextdotjs, SiTypescript,
  SiTailwindcss, SiPrisma, SiNodedotjs, SiExpress,
  SiRedux, SiPostgresql, SiMongodb, SiMongoose, SiFirebase,
} from "react-icons/si";

const skills = [
  { skill: "Javascript", level: "Advanced", Icon: SiJavascript, color: "#F7DF1E" },
  { skill: "React", level: "Advanced", Icon: SiReact, color: "#61DAFB" },
  { skill: "NextJS", level: "Advanced", Icon: SiNextdotjs, color: "var(--foreground)" },
  { skill: "TypeScript", level: "Intermediate", Icon: SiTypescript, color: "#3178C6" },
  { skill: "Tailwind CSS", level: "Advanced", Icon: SiTailwindcss, color: "#06B6D4" },
  { skill: "Prisma", level: "Intermediate", Icon: SiPrisma, color: "#2D3748" },
  { skill: "NodeJS", level: "Advanced", Icon: SiNodedotjs, color: "#339933" },
  { skill: "ExpressJS", level: "Advanced", Icon: SiExpress, color: "#828282" },
  { skill: "Redux", level: "Intermediate", Icon: SiRedux, color: "#764ABC" },
  { skill: "Postgresql", level: "Intermediate", Icon: SiPostgresql, color: "#4169E1" },
  { skill: "MongoDB", level: "Advanced", Icon: SiMongodb, color: "#47A248" },
  { skill: "Mongoose", level: "Intermediate", Icon: SiMongoose, color: "#880000" },
  { skill: "Firebase", level: "Intermediate", Icon: SiFirebase, color: "#FFCA28" },
];

// Animation Variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const SkillsPage = () => {
  return (
    <section className="relative py-20 px-6 sm:px-12 lg:px-20 bg-background text-foreground transition-colors duration-500 overflow-hidden">
      
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -z-10"></div>

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            My <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-green-500">Skills</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary rounded-full mt-4 mx-auto"></div>
          <p className="mt-6 text-muted-foreground max-w-xl mx-auto text-lg">
            I specialize in the modern web ecosystem, focusing on performance, scalability, and clean code.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
        >
          {skills.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                rotate: [0, -2, 2, 0],
                transition: { duration: 0.3 } 
              }}
              className="group relative p-6 rounded-2xl bg-secondary/30 border border-primary/5 backdrop-blur-sm flex flex-col items-center justify-center gap-4 transition-all hover:bg-secondary/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5"
            >
              {/* Floating Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-2xl -z-10"
                style={{ backgroundColor: item.color }}
              ></div>

              {/* Icon Container */}
              <div className="text-5xl transition-transform duration-300 group-hover:scale-110" style={{ color: item.color }}>
                <item.Icon />
              </div>

              {/* Skill Info */}
              <div className="text-center">
                <h3 className="font-bold text-sm sm:text-base tracking-wide">{item.skill}</h3>
                <span className="text-[10px] uppercase font-bold tracking-[0.1em] text-muted-foreground group-hover:text-primary transition-colors">
                  {item.level}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsPage;