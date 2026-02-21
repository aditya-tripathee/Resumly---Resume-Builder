import React, { useEffect, useState } from "react";
import {
  DeleteIcon,
  FilePenLineIcon,
  LoaderCircleIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  UploadCloud,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { dummyResumeData } from "../assets/assetsFile.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import api from "../config/app.js";
import { toast } from "react-hot-toast";
import pdfToText from "react-pdftotext";

function Dashboard() {
  const { user, token } = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState([]);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const loadAllResumes = async () => {
    try {
      const { data } = await api.get(`/api/users/resumes`, {
        headers: {
          Authorization: token,
        },
      });
      setAllResumes(data.resumes);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const createResume = async (e) => {
    try {
      e.preventDefault();
      const { data } = await api.post(
        `/api/resumes/create`,
        { title },
        {
          headers: {
            Authorization: token,
          },
        },
      );
      setAllResumes([...allResumes, data.resume]);
      setTitle("");
      setShowCreateResume(false);
      navigate(`/app/builder/${data.resume._id}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const uploadResume = async (e) => {
    e.preventDefault();
    if (!resume) return toast.error("Select a PDF first");
    setIsLoading(true);
    try {
      const resumeText = await pdfToText(resume); // frontend text extract
      const { data } = await api.post(
        `/api/ai/upload-resume`,
        { title, resumeText },
        { headers: { Authorization: token } },
      );
      setTitle("");
      setResume(null);
      setShowUploadResume(false);
      navigate(`/app/builder/${data.resumeId}`);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Upload failed");
    }
    setIsLoading(false);
  };

  const editTitle = async (e) => {
    try {
      e.preventDefault();

      const { data } = await api.put(
        `/api/resumes/update`,
        {
          resumeId: editResumeId,
          resumeData: { title }, // ✅ FIXED
        },
        {
          headers: {
            Authorization: token,
          },
        },
      );

      setAllResumes(
        allResumes.map((resume) =>
          resume._id === editResumeId ? { ...resume, title } : resume,
        ),
      );

      setTitle("");
      setEditResumeId("");
      toast.success(data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const confirm = window.confirm(
        `Are you sure you want to delete your resume?`,
      );
      if (confirm) {
        const { data } = await api.delete(`/api/resumes/delete/${resumeId}`, {
          headers: {
            Authorization: token,
          },
        });
        setAllResumes((prev) =>
          prev.filter((resume) => resume.id !== resumeId),
        );
        toast.success(data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <p className="text-2xl text-indigo-700 mt-6 font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text">
        Welcome, {user.name}
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => setShowCreateResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg
         gap-2 text-slate-600 border border- border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg
          transition-all duration-300 cursor-pointer"
        >
          <PlusIcon
            className=" cursor-pointer size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300
           to-indigo-500 text-white rounded-full"
          />
          <p className=" text-sm group-hover:text-indigo-600 transition-all duration-300">
            Create Resume
          </p>
        </button>
        <button
          onClick={() => setShowUploadResume(true)}
          className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center 
        justify-center rounded-lg gap-2 text-slate-600 border border- border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
        >
          <UploadCloudIcon
            className=" cursor-pointer size-11 transition-all duration-300 p-2.5 
          bg-gradient-to-br from-indigo-300 to-pink-500 text-white rounded-full"
          />
          <p className=" text-sm group-hover:text-indigo-600 transition-all duration-300">
            Upload Existing
          </p>
        </button>
      </div>

      {/* line  */}
      <hr className="border-slate-300 my-6 sm:w-[305px]" />

      {/* resume */}
      <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
        {allResumes.map((resume, index) => {
          const baseColor = colors[index % colors.length];
          return (
            <button
              onClick={() => navigate(`/app/builder/${resume._id}`)}
              key={index}
              className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg transition-all duration-300 cursor-pointer gap-2 border group hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                borderColor: baseColor + "40",
              }}
            >
              <FilePenLineIcon
                className="size-7 group-hover:scale-105 transition-all"
                style={{ color: baseColor }}
              />
              <p
                className="text-sm group-hover:scale-105 transition-all px-2 text-center"
                style={{ color: baseColor }}
              >
                {resume.title}
              </p>
              <p
                className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                style={{ color: baseColor + "90" }}
              >
                Updated on {new Date(resume.updatedAt).toLocaleDateString()}
              </p>
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute top-1 group-hover:flex items-center hidden"
              >
                <TrashIcon
                  onClick={() => deleteResume(resume._id)}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                />
                <PencilIcon
                  onClick={() => {
                    setEditResumeId(resume._id);
                    setTitle(resume.title);
                  }}
                  className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors"
                />
              </div>
            </button>
          );
        })}
      </div>

      {showCreateResume && (
        <form
          onSubmit={createResume}
          onClick={() => setShowCreateResume(false)}
          action={""}
          className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border border-white rounded-2xl px-5 py-9 shadow-lg bg-slate-400 relative"
          >
            <h2 className="mb-2 font-medium text-[18px]">Create a Resume</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="border-white w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded-[5px]"
              required
            />
            <button className="w-[100%] py-2  bg-indigo-600 rounded text-white hover:bg-green-500 cursor-pointer transition-all">
              Create Resume
            </button>
            <XIcon
              className="absolute top-10 right-4  transition-colors text-gray-900 hover:text-slate-600 cursor-pointer"
              onClick={() => {
                setShowCreateResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {showUploadResume && (
        <form
          onSubmit={uploadResume}
          onClick={() => setShowUploadResume(false)}
          action={""}
          className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border border-white px-15 py-10 rounded-2xl  shadow-lg bg-slate-400 relative"
          >
            <h2 className="mb-2 font-medium text-[18px]">Upload Resume</h2>
            <input
              type="text"
              placeholder="Enter resume title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className="border-white w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded-[5px]"
              required
            />
            <div className="">
              <label
                htmlFor="resume-input"
                className="block text-sm text-slate-800"
              >
                Select resume file
                <div className="flex flex-col items-center justify-center gap-2 border border-gray-600 group text-slate-400 rounded-md p-4 py-10 my-4  hover:text-gray-700 cursor-pointer transition-colors">
                  {resume ? (
                    <p className="text-indigo-700">{resume.name}</p>
                  ) : (
                    <>
                      <UploadCloud className="size-14 stroke-1 text-indigo-800" />
                      <p className=" text-gray-950">Upload resume</p>
                    </>
                  )}
                </div>
              </label>
              <input
                type="file"
                id="resume-input"
                accept=".pdf"
                hidden
                onChange={(e) => setResume(e.target.files[0])}
              />
            </div>
            <button
              className="w-[100%] py-2  bg-indigo-600 rounded text-white hover:bg-green-500 cursor-pointer 
              transition-all"
            >
              {isLoading && (
                <LoaderCircleIcon className="animate-spin size-4 items-center justify-center text-white" />
              )}
              {isLoading ? "Uploading.." : "Upload Resume"}
            </button>
            <XIcon
              className="absolute top-10 right-4  transition-colors text-gray-900 hover:text-slate-600 cursor-pointer"
              onClick={() => {
                setShowUploadResume(false);
                setTitle("");
              }}
            />
          </div>
        </form>
      )}

      {editResumeId && (
        <form
          onSubmit={editTitle}
          onClick={() => setEditResumeId("")}
          action={""}
          className=" fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="border border-white rounded-2xl px-5 py-9 shadow-lg bg-slate-400 relative"
          >
            <h2 className="mb-2 font-medium text-[18px]">Edit Resume Title</h2>
            <input
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              type="text"
              placeholder="Enter resume title"
              className="border-white w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 border rounded-[5px]"
              required
            />
            <button className="w-[100%] py-2  bg-indigo-600 rounded text-white hover:bg-green-500 cursor-pointer transition-all">
              Update Resume
            </button>
            <XIcon
              className="absolute top-10 right-4  transition-colors text-gray-900 hover:text-slate-600 cursor-pointer"
              onClick={() => {
                setEditResumeId("");
                setTitle("");
              }}
            />
          </div>
        </form>
      )}
    </div>
  );
}

export default Dashboard;




