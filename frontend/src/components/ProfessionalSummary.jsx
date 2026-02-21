import React, { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { useSelector } from "react-redux";
import api from "../config/app";
import { toast } from "react-hot-toast";

const ProfessionalSummary = ({ data, onChange, setResumeData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummary = async () => {
    if (!data?.trim()) {
      toast.error("Please write something before enhancing.");
      return;
    }

    try {
      setIsGenerating(true);

      const response = await api.post(
        `/api/ai/enhance-pro-summ`,   // ✅ fixed URL
        { userContent: data },       // ✅ no need to manually add prompt string
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setResumeData((prev) => ({
        ...prev,
        professional_summary: response?.data?.enhanceContent || "",
      }));

      toast.success("Summary enhanced successfully ✨");
    } catch (error) {
      console.error(error);
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    } finally {
      setIsGenerating(false);   // ✅ important
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900">
            Professional Summary
          </h3>
          <p className="text-sm text-gray-500">
            Add a summary for your resume
          </p>
        </div>

        <button
          disabled={isGenerating}
          onClick={generateSummary}
          className="flex items-center gap-2 px-3 py-1 
          text-sm bg-purple-100 text-purple-800 
          hover:bg-purple-400 rounded-lg 
          border border-purple-800 transition-colors 
          disabled:opacity-50"
        >
          {isGenerating ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" />
          )}
          {isGenerating ? "Enhancing..." : "AI Enhance"}
        </button>
      </div>

      <div className="mt-6">
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

        <p className="text-sm text-gray-500 max-w-[80%] mx-auto text-center">
          Tip: Keep it concise and focus on your most relevant achievements and skills.
        </p>
      </div>
    </div>
  );
};

export default ProfessionalSummary;