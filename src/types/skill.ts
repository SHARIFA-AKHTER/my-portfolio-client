import  { ReactElement } from "react";

export interface Skill {
  id: number;
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  icon: ReactElement;
}
