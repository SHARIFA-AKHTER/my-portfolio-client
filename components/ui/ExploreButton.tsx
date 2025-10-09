"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";


interface ExploreButtonProps {
  target: "blogs" | "projects";
}

export default function ExploreButton({ target }: ExploreButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (target === "blogs") {
      router.push("/dashboard/blogs");
    } else {
      router.push("/dashboard/projects");
    }
  };

  return (
    <Button
      onClick={handleClick}
      className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition duration-300"
    >
      Explore My Work
    </Button>
  );
}
