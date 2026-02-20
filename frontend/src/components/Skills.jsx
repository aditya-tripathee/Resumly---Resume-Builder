import React, { useState } from "react";
import { CrossIcon, Plus, Sparkles } from "lucide-react";

const Skills = ({ data = [], onChange }) => {
  const [newSkills, setNewSkills] = useState([]);
  const addSkills = () => {
    if (newSkills.trim() && !data.includes(newSkills.trim())) {
      onChange([...data, newSkills.trim()]);
      setNewSkills("");
    }
  };
  const removeSkills = (indexToREmove) => {
    onChange(data.filter((_, index) => index !== indexToREmove));
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkills();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold mb-1">Skills</h3>
        <p className="text-gray-700 text-sm mb-1">Add your technical and soft skills</p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter a skill"
            className="flex-1 px-3 py-2 text-sm border border-gray-500 rounded-lg"
            onChange={(e) => setNewSkills(e.target.value)}
            value={newSkills}
            onKeyDown={handleKeyPress}
          />
          <button
            onClick={addSkills}
            disabled={!newSkills.trim}
            className="flex cursor-pointer items-center gap-2 px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="size-4" />
            Add
          </button>
        </div>
        {data.length > 0 ? (
          <div className="flex flex-wrap gap-2 mb-2 mt-3">
            {data.map((skill, index) => (
              <span
                key={index}
                className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                {skill}
                <button
                  onClick={() => removeSkills(index)}
                  className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <CrossIcon className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        ) : (
          <div className="text-center py-6 text-gray-500">
            <Sparkles className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p>No skills added yet</p>
            <p className="text-sm text-gray-700">Add your technical and soft skills above.</p>
          </div>
        )}
        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>Tip: </strong>Add 8-12 relevant skills. Includes both
            technical skills (programming langiages, tools) and soft skills
            (leadership, communication).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Skills;
