import React, { useEffect, useState } from 'react'
import {Link, useParams} from "react-router-dom";
import { dummyResumeData } from '../assets/assetsFile.js';
import ResumePreview from '../components/ResumePreview.jsx';
import Loader from '../components/Loader.jsx';
import { ArrowLeftIcon } from 'lucide-react';
import api from '../config/app.js';

const Preview = () => {
  const {resumeId} = useParams();
  const [resumeData ,setResumeData] = useState(null);
  const [loading,setLoading] = useState(true);
  const loadResume = async()=>{
     try {
      const {data} = await api.get(`/api/resumes/public/${resumeId}`);
      setResumeData(data.resume);

     } catch (error) {
      console.log(error.message);
     }
     finally{
      setLoading(false);
     }
     
  };

  useEffect(()=>{
       loadResume();
  },[resumeId])
  return resumeData ? (
    <div className='bg-slate-100'>
       <div className=' max-w-3xl mx-auto py-10'>
           <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accentColor} classes='py-4 bg-white'/>
       </div>
    </div>
  ) : (
    <div>
      {
            loading ? <Loader/> : 
            <div className='flex flex-col items-center justify-center h-screen'>
              <p>Resume not found</p>
             <Link to={"/"}>
               <a href=''className='mt-6 bg-indigo-500 hover:bg-indigo-600 text-white rounded-full px-6 h-9 m-1 ring-offset-1 ring-1 ring-indigo-400 flex items-center transition-colors'>
              <ArrowLeftIcon className='mr-2 size-4'/>
              go to home page
              </a>
             </Link>
            </div>
      }
    </div>   
  )
}

export default Preview
