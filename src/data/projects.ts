import { Projects } from "@/types/project";

export const projects: Projects[] = [
  {
    id: 1,
    title: "Portfolio Website",
    description: "A personal portfolio built with Next.js, TailwindCSS, and TypeScript.",
    techStack: ["Next.js", "TailwindCSS", "TypeScript"],
    link: "https://your-portfolio-link.com",
    image: "/images/portfolio.png",
  },
  {
    id: 2,
    title: "E-commerce Store",
    description: "Full-stack e-commerce application with cart, checkout, and admin dashboard.",
    techStack: ["React", "Node.js", "MongoDB", "Express"],
    link: "https://your-store-link.com",
    image: "/images/ecommerce.png",
  },
  {
    id: 3,
    title: "Blog Platform",
    description: "A blogging platform with Markdown support and authentication.",
    techStack: ["Next.js", "Prisma", "PostgreSQL"],
    link: "https://your-blog-link.com",
    image: "/images/blog.png",
  },
];
