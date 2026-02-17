import ai from "../config/ai.js";

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
    return res.status(200).json({enhanceContent});
    

  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

