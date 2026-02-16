import mongoose from "mongoose";


export const dbConnect = async()=>{
      try {
        const mongodbUri = process.env.MONGODB_URI;
        const projectName = "resumly";
        if(!mongodbUri){
            throw new Error(`MongoDB Uri variable not set`);
        }
        await mongoose.connect(`${mongodbUri}/${projectName}`);
        console.log(`Database connected successfully!`);

      } catch (error) {
        console.error(`Error connecting to MongoDB`,error);
        process.exit(1);
      }
}


