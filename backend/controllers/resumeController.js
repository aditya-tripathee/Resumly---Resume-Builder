import imageKit from "../config/imageKit.js";
import Resume from "../models/Resume.js";
import fs from "fs";

// controller for creating a new resume
// POST :-- api/resumes/create
export const createResume = async (req, res) => {
  try {
    const userId = req.userId; // by middlewares
    const { title } = req.body;

    // create new resume
    const newResume = await Resume.create({ userId, title });
    // return sucess message
    return res
      .status(201)
      .json({ message: "Resume created successfully", resume: newResume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for deleting resume
// delete :-- api/resumes/delete
export const deleteResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    await Resume.findOneAndDelete({ userId, _id: resumeId });

    // return success message
    return res.status(200).json({ message: "Resume deleted successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller userResume by userId
// get :-- api/resumes/get
export const getResumeById = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId } = req.params;

    const resume = await Resume.findOne({ userId, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "No resume found!" });
    }

    resume.__v = undefined;
    resume.createdAt = undefined;
    resume.updatedAtAt = undefined;
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controllers for getting resume by id public
// api/resumes/public
export const getPublicResumeId = async (req, res) => {
  try {
    const { resumeId } = req.params;
    const resume = await Resume.findOne({ public: true, _id: resumeId });
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }
    return res.status(200).json({ resume });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


// controller for updating a resume
// api/resumes/update
export const updateResume = async (req, res) => {
  try {
    const userId = req.userId;
    const { resumeId, resumeData, removeBackground } = req.body;
    const image = req.file;

    if (!resumeId || !resumeData) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    let resumeDataCopy;

    // ✅ Correct check
    if (typeof resumeData === "string") {
      resumeDataCopy = JSON.parse(resumeData);
    } else {
      resumeDataCopy = structuredClone(resumeData);
    }

    // ✅ Handle image upload
    if (image) {
      const imageBufferData = fs.createReadStream(image.path);

      const response = await imageKit.files.upload({
        file: imageBufferData,
        fileName: "resume.png",
        folder: "user-resumes",
        transformation: {
          pre:
            "w-300,h-300,fo-face,z-0.75" +
            (removeBackground ? ",e-bgremove" : ""),
        },
      });

      resumeDataCopy.personal_info.image = response.url;
    }

    // ✅ Correct Mongo query
    const resume = await Resume.findOneAndUpdate(
      { userId, _id: resumeId },  // 👈 findByIdAndUpdate me filter object galat tha
      resumeDataCopy,
      { new: true }
    );

    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    return res.status(200).json({
      message: "Updated successfully",
      resume,
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error.message });
  }
};