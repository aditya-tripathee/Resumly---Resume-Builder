import ai from "../config/ai.js";
import Resume from "../models/Resume.js";

// controller for enhancing the a resume professional summary
// api/ai/enhance-pro-summ
export const enhanceProfessionalSummary = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert in resume writing. Your task is to enhance the professional summary of resume.The summary should be 1-2 sentemces also highlighting key skills,
            experience, and carrer objectives. Make it compelling and ATS-friendly and only return the text no options or anything else`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for enhancing the resume job description
// api/ai/enhance-job-des
export const enhanceJobDescription = async (req, res) => {
  try {
    const { userContent } = req.body;
    if (!userContent) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: `You are an expert in resume writing. Your task is to enhance the job description of resume. 
          The job description should be 1-2 sentemces also highlighting key resposnibilities and achivements. Use action verbs and quantifiable results where possible.
          Make it compelling and ATS-friendly and only return the text no options or anything else`,
        },
        {
          role: "user",
          content: userContent,
        },
      ],
    });

    const enhanceContent = response.choices[0].message.content;
    return res.status(200).json({ enhanceContent });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// controller for uploading a resume to the database
// api/api/upload-resume
export const uploadResume = async (req, res) => {
  try {
    const { resumeText, title } = req.body;
    const userId = req.userId;
    if (!resumeText) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const systemPrompt = `You are an expert Ai agent to extract data from existing resume`;
    const userPrompt = `extract data from this resume: ${resumeText}
     Provide data in the following JSON format with no additional text before or after:
        
         {
           
               professional_summary : {type:String, default:""},
               skills: [{type:String}],
               personal_info: {
                   image:{type:String,default:""},
                   full_name :{type:String, default:""},
                   profession: {type:String, defualt:""},
                   email: {type:String, defualt:""},
                   phone: {type:String, defualt:""},
                   location: {type:String, defualt:""},
                   linkedin: {type:String, defualt:""},
                   website: {type:String, defualt:""},
               },
               experience: [
                   {
                       company:{type:String},
                       position:{type:String},
                       start_date:{type:String},
                       end_date:{type:String},
                       description:{type:String},
                       isCurrent:{type:Boolean},
                   }
               ],
               project:[
                   {
                       name:{type:String},
                       type:{type:String},
                       description:{type:String},
                   }
               ],
               education:[
                   {
                       name:{type:String},
                       degree:{type:String},
                       field:{type:String},
                       graduation_date:{type:String},
                       gpa:{type:String},
                   }
                         ]
         }
    `;

    const response = await ai.chat.completions.create({
      model: process.env.GEMINI_MODEL,
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
      response_format: { type: "json-object" },
    });

    const extractedData = response.choices[0].message.content;
    const parseData = JSON.parse(extractedData);
    const newResume = await Resume.create({ userId, title, ...parseData });

    return res.json({ resumeId: newResume._id });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


