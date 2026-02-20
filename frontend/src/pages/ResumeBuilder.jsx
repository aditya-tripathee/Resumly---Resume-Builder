import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/assetsFile";
import {
  ArrowLeftIcon,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadIcon,
  EyeClosed,
  EyeIcon,
  EyeOffIcon,
  FileText,
  FolderIcon,
  GraduationCap,
  Share2Icon,
  Sparkles,
  User,
} from "lucide-react";
import PersonalInfoForm from "../components/PersonalInfoForm";
import ResumePreview from "../components/ResumePreview";
import TemplateSelector from "../components/TemplateSelector";
import ColorPeeker from "../components/ColorPeeker";
import ProfessionalSummary from "../components/ProfessionalSummary";
import Experience from "../components/Experience";
import Education from "../components/Education";
import ProjectForm from "../components/ProjectForm";
import Skills from "../components/Skills";

const ResumeBuilder = () => {
  const { resumeId } = useParams();
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: "",
    personal_info: {},
    professional_summary: "",
    experience: [],
    project: [],
    education: [],
    skills: [],
    template: "classic",
    accent_color: "#3B82F6",
    public: false,
  });

  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);

  const loadingExistingResume = async () => {
    const resume = dummyResumeData.find((resume) => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title;
    }
  };

  const sections = [
    { id: "personal", name: "Personal info", icon: User },
    { id: "summary", name: "Summary", icon: FileText },
    { id: "experience", name: "Experience", icon: Briefcase },
    { id: "education", name: "Education", icon: GraduationCap },
    { id: "project", name: "Project", icon: FolderIcon },
    { id: "skills", name: "Skills", icon: Sparkles },
  ];

  const activeSection = sections[activeSectionIndex];

  useEffect(() => {
    loadingExistingResume();
  }, []);

  const changeResumeVisibility = async()=>{
    setResumeData({...resumeData,public:!resumeData.public})
  }

  const handleShare = ()=>{
     const frontendUrl = window.location.href.split('/app/')[0];
     const resumeUrl = frontendUrl+'/view/'+resumeId;
     if(navigator.share){
      navigator.share({url:resumeUrl,text:"my-resume",})
     }
     else{
      alert("Share not supported on this browser");
     }
  }

  const downloadResume = () =>{
    window.print();

  }

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={"/app"}
          className="inline-flex gap-2 items-center text-slate-500 hover:text-slate-800 transition-all"
        >
          <ArrowLeftIcon className="size-5 " /> Back to Dashboard
        </Link>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* lEFT PANEL -FORM  */}
          <div className="relative lg:col-span-5 rounded-lg overflow-hidden">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-1 relative">
              {/* Gray background line */}
              <hr className="absolute top-0 left-0 right-0 border-2 border-gray-200" />

              {/* Indigo progress line */}
              <hr
                className="absolute top-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-indigo-700 border-none transition-all duration-500"
                style={{
                  width: `${(activeSectionIndex * 100) / (sections.length - 1)}%`,
                }}
              />
              {/* section navigation */}

              <div className="relative flex justify-between items-center mb-6 border-b border-gray-300 py-1">
                <div className="flex justify-between items-center gap-2">
                  <TemplateSelector
                    selectedTemplate={resumeData.template}
                    onChange={(template) =>
                      setResumeData((prev) => ({ ...prev, template }))
                    }
                  />
                  <ColorPeeker
                    selectedColor={resumeData.accent_color}
                    onChange={(color) =>
                      setResumeData((prev) => ({
                        ...prev,
                        accent_color: color,
                      }))
                    }
                  />
                </div>

                <div className="flex  items-center ">
                  {/* Previous Button */}
                  {activeSectionIndex !== 0 && (
                    <button
                      onClick={() =>
                        setActiveSectionIndex((prevIndex) =>
                          Math.max(prevIndex - 1, 0),
                        )
                      }
                      className="flex cursor-pointer items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all"
                      disabled={activeSectionIndex === 0}
                    >
                      <ChevronLeft className="size-4" /> Previous
                    </button>
                  )}

                  {/* Spacer */}
                  <div></div>

                  {/* Next Button */}
                  <button
                    onClick={() =>
                      setActiveSectionIndex((prevIndex) =>
                        Math.min(prevIndex + 1, sections.length - 1),
                      )
                    }
                    className={`flex cursor-pointer items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 transition-all ${
                      activeSectionIndex === sections.length - 1
                        ? "opacity-50"
                        : ""
                    }`}
                    disabled={activeSectionIndex === sections.length - 1}
                  >
                    Next <ChevronRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* form content */}
              <div className="space-y-6">
                {activeSection.id === "personal" && (
                  <PersonalInfoForm
                    data={resumeData.personal_info}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        personal_info: data,
                      }))
                    }
                    removeBackground={removeBackground}
                    setRemoveBackground={setRemoveBackground}
                  />
                )}

                {activeSection.id === "summary" && (
                  <ProfessionalSummary
                    data={resumeData.professional_summary}
                    onChange={(data) =>
                      setResumeData((prev) => ({
                        ...prev,
                        professional_summary: data,
                      }))
                    }
                    setResumeData={setResumeData}
                  />
                )}

                {activeSection.id === "experience" && (
                  <Experience
                    data={resumeData.experience}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, experience: data }))
                    }
                  />
                )}

                {activeSection.id === "education" && (
                  <Education
                    data={resumeData.education}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, education: data }))
                    }
                  />
                )}

                {activeSection.id === "project" && (
                  <ProjectForm
                    data={resumeData.project}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, project: data }))
                    }
                  />
                )}

                {activeSection.id === "skills" && (
                  <Skills
                    data={resumeData.skills}
                    onChange={(data) =>
                      setResumeData((prev) => ({ ...prev, skills: data }))
                    }
                  />
                )}
              </div>
              <button className="mt-6 cursor-pointer text-sm transition-all bg-gradient-to-br  from-indigo-100 to-indigo-200 ring-indigo-300 font-medium hover:bg-indigo-900 text-indigo-700  px-6 py-2 rounded-lg">
                Save Chnages
              </button>
            </div>
          </div>

          {/* RIGHT PANEL - PREVIEW OF OUR RESUME */}
          <div className="lg:col-span-7 max-lg:mt-6">
            <div className="relative w-full ">
              <div className="absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2">
                {resumeData.public && (
                  <button onClick={handleShare} 
                  className="flex items-center px-5 p-2.5 cursor-pointer hover:ring hover:border-indigo-600 font-semibold gap-2 
                text-xs bg-gradient-to-br from-indigo-200 to-indigo-300 text-indigo-600 rounded-lg ring-indigo-400 transition-colors">
                    <Share2Icon className="size-4" /> Share
                  </button>
                )}
                <button
                  onClick={changeResumeVisibility}
                  className="flex items-center px-4 p-2 gap-2 text-xs cursor-pointer font-semibold 
                bg-gradient-to-br from-indigo-200  to-indigo-300 text-indigo-600 ring-indigo-400 rounded-lg hover:ring transition-colors"
                >
                  {resumeData.public ? (
                    <EyeIcon className="size-5" />
                  ) : (
                    <EyeOffIcon className="size-5" />
                  )}
                  {resumeData.public ? "Public" : "Private"}
                </button>
                <button id="resume"
                  onClick={downloadResume}
                  className="flex items-center px-5 p-2.5 cursor-pointer hover:ring hover:border-indigo-600 font-semibold gap-2 
                text-xs bg-gradient-to-br from-indigo-200 to-indigo-300 text-indigo-600 rounded-lg ring-indigo-400 transition-colors"
                >
                  <DownloadIcon className=" size-4" /> Download
                </button>
              </div>
            </div>
            {/* resume preview */}
            <ResumePreview
              data={resumeData}
              template={resumeData.template}
              accentColor={resumeData.accent_color}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
