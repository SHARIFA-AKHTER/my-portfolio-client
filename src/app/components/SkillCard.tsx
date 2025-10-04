import { IconType } from "react-icons";

interface SkillCardProps {
  skill: string;
  level?: string;
  Icon?: IconType;
}

const SkillCard = ({ skill, level, Icon }: SkillCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-xl px-4 py-6 flex flex-col items-center justify-center hover:shadow-lg transition transform hover:-translate-y-1">
      {Icon && <Icon className="text-4xl text-blue-500 mb-2" />}
      <p className="text-sm font-semibold text-gray-800">{skill}</p>
      {level && <span className="text-xs text-gray-500">{level}</span>}
    </div>
  );
};

export default SkillCard;
