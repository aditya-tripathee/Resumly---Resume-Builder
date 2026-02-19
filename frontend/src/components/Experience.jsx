
import React from "react";
import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";

const Experience = ({ data = [], onChange }) => {
  const addExperience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (index) => {
    const updated = data.filter((_, i) => i !== index);
    onChange(updated);
  };

  const updateExperience = (index, field, value) => {
    const updated = [...data];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  const handleCheckboxChange = (index, checked) => {
    const updated = [...data];

    updated[index] = {
      ...updated[index],
      is_current: checked,
      end_date: checked ? "" : updated[index].end_date,
    };

    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">
            Add your job experience
          </p>
        </div>

        <button
          type="button"
          onClick={addExperience}
          className="flex items-center gap-2 px-3 py-1 text-sm 
          bg-purple-100 text-purple-800 hover:bg-purple-400 
          rounded-lg border border-purple-800 transition-colors"
        >
          <Plus className="size-4" />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p className="text-sm">
            Click "Add Experience" to get started.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((experience, index) => (
            <div
              key={index}
              className="p-4 border border-gray-200 rounded-lg space-y-3"
            >
              <div className="flex justify-between items-start">
                <h4 className="font-medium">
                  Experience #{index + 1}
                </h4>

                <button
                  type="button"
                  onClick={() => removeExperience(index)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={experience.company}
                  onChange={(e) =>
                    updateExperience(index, "company", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-400"
                />

                <input
                  type="text"
                  placeholder="Job Title"
                  value={experience.position}
                  onChange={(e) =>
                    updateExperience(index, "position", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-400"
                />

                <input
                  type="month"
                  value={experience.start_date}
                  onChange={(e) =>
                    updateExperience(index, "start_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-400"
                />

                <input
                  type="month"
                  value={experience.end_date}
                  disabled={experience.is_current}
                  onChange={(e) =>
                    updateExperience(index, "end_date", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg border border-gray-400 disabled:bg-gray-100"
                />

                {/* ✅ Fixed Checkbox */}
                <div className="flex items-center gap-2 col-span-2">
                  <input
                    type="checkbox"
                    checked={experience.is_current || false}
                    onChange={(e) =>
                      handleCheckboxChange(index, e.target.checked)
                    }
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm text-gray-700">
                    Currently working here
                  </span>
                </div>

                <div className="col-span-2">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>

                  <textarea
                    rows={4}
                    value={experience.description}
                    onChange={(e) =>
                      updateExperience(index, "description", e.target.value)
                    }
                    className="w-full text-sm px-3 py-2 rounded-lg resize-none border border-gray-400"
                    placeholder="Describe your key responsibilities and achievements..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Experience;
