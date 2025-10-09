"use client";

import { features } from "../../constants/features";

export default function Features() {
  return (
    <section className="w-full px-4 sm:px-6 md:px-20 lg:px-40 ">
      {/* Title */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 mb-6">
        Tech Stack & Tools We Use
      </h1>

      {/* Outer gray background container */}
      <div className="bg-gray-100 rounded-xl p-4 sm:p-6 md:p-8 flex flex-wrap gap-4 md:gap-6 justify-center">
        {features.map((f) => {
          const Icon = f.icon;
          return (
            <div
              key={f.title}
              className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 hover:bg-gray-200 transition min-w-[120px] sm:min-w-[140px] md:min-w-[160px] flex-1"
            >
              <div className="text-2xl sm:text-3xl text-purple-700">
                <Icon />
              </div>
              <h4 className="font-semibold text-gray-800 text-sm sm:text-base">
                {f.title}
              </h4>
            </div>
          );
        })}
      </div>
    </section>
  );
}
