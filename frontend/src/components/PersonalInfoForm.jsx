import {
  BriefcaseBusiness,
  Globe,
  Linkedin,
  MailIcon,
  Phone,
  User,
  Map,
} from "lucide-react";
import React from "react";

const PersonalInfoForm = ({
  data,
  onChange, // ✅ FIX: Pehle tu {} de raha tha, ye galat tha. onChange ko function hona chahiye
  removeBackground,
  setRemoveBackground,
}) => {
  const handleChange = (field, value) => {
    onChange({ ...data, [field]: value });
    // ✅ FIX: Ye sahi hai, bas onChange default function hona chahiye tha
  };

  const fields = [
    {
      key: "full_name",
      label: "Full Name",
      icon: User,
      type: "text",
      required: true,
    },
    {
      key: "email",
      label: "Email Address",
      icon: MailIcon,
      type: "email",
      required: true,
    },
    { key: "phone", label: "Phone", icon: Phone, type: "tel", required: true }, // ✅ FIX: type="phone" galat tha, correct type="tel"
    { key: "location", label: "Location", icon: Map, type: "text" },
    {
      key: "profession",
      label: "Profession",
      icon: BriefcaseBusiness,
      type: "text",
    },
    { key: "linkedin", label: "Linkedin Profile", icon: Linkedin, type: "url" },
    { key: "website", label: "Website", icon: Globe, type: "url" },
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900">
        Personal information
      </h3>
      <p className="text-sm text-gray-600">
        Get Started with the personal information
      </p>

      {/* Image Upload */}
      <div className="flex items-center gap-2">
        <label>
          {data?.image ? (
            <img
              src={
                typeof data.image === "string"
                  ? data.image
                  : URL.createObjectURL(data.image)
              }
              alt="user-image"
              className="w-16 h-16 rounded-full object-cover mt-5 ring ring-slate-300 hover:opacity-80"
            />
          ) : (
            <div className="inline-flex items-center gap-2 text-slate-600 mt-5 hover:text-slate-700 cursor-pointer">
              <User className="w-10 h-10 p-2.5 rounded-full border" />{" "}
              {/* ✅ FIX: Tailwind class "size-10" invalid → use w-10 h-10 */}
              upload user image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleChange("image", e.target.files[0])}
          />
        </label>

        {/* Remove Background */}
        {typeof data.image === "object" && (
          <div className="flex flex-col gap-1 pl-4 text-sm">
            <p>Remove Background</p>
            <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
              <input
                type="checkbox"
                className="sr-only peer"
                onChange={() => setRemoveBackground((prev) => !prev)}
                checked={removeBackground}
              />
              <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-indigo-600 transition-colors duration-200"></div>
              <span className="dot absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4"></span>
            </label>
          </div>
        )}
      </div>

      {/* Form Fields */}
      {fields.map((field) => {
        const Icon = field.icon;
        return (
          <div key={field.key} className="space-y-1 mt-5">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
              <Icon className="w-4 h-4" />{" "}
              {/* ✅ FIX: Tailwind class "size-4" invalid → use w-4 h-4 */}
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <input
              type={field.type} // ✅ type="tel" and type="email" fixed above
              value={data[field.key] || ""}
              onChange={(e) => handleChange(field.key, e.target.value)}
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              placeholder={`Enter your ${field.label.toLowerCase()}`}
              required={field.required}
            />
          </div>
        );
      })}
    </div>
  );
};

export default PersonalInfoForm;
