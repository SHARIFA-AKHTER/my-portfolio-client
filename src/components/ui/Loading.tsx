import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <div className="flex flex-col items-center gap-4">
        <Loader className="h-12 w-12 animate-spin text-purple-600" />
        <span className="text-lg md:text-xl font-semibold text-gray-800 animate-pulse">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
