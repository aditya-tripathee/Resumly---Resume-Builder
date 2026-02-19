import React from "react";
import { Sparkles } from "lucide-react";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  return (
    <div className="space-y-4 ">
      <div className="flex items-center justify-between">
        <div className="">
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Sumary
          </h3>
          <p className="text-sm text-gray-500">Add summary for your resume</p>
        </div>
        <button
          className="flex cursor-pointer items-center gap-2 px-3 py-1 
        text-sm bg-purple-100 text-purple-800 hover:bg-purple-400 rounded-lg border border-purple-800 transition-colors disabled:opacity-50"
        >
          <Sparkles className="size-4" />
          AI Enhance
        </button>
      </div>
      <div>
        <div className="mt-6 ">
          <textarea
            value={data ?? ""}
            onChange={(e) => onChange(e.target.value)}
            rows={6}
            className="w-full h-[250px] px-5 py-5 mt-5 text-sm 
  border border-gray-300 rounded-lg 
  focus:ring-2 focus:ring-blue-500 
  focus:border-blue-500 outline-none 
  transition-colors resize-none"
            placeholder="Write a compelling professional summary that highlights your key strengths and career objectives."
          />

          <p className="text-sm text-gray-500 max-w-4/5 mx-auto text-center">
            Tip: Keep it concise and focus on your most relevant achivements and
            skills.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSummary;
