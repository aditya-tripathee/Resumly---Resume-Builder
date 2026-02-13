import { BookUserIcon, Star, Stars, Verified } from 'lucide-react'
import React from 'react'

const Testimonials = () => {
   const testimonials = [
    {
        text: "Resumly made building my resume effortless. The templates are modern and recruiter-friendly.",
        name: "Cristofer Levin",
        role: "Frontend Engineer",
        image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200"
    },
    {
        text: "I landed interviews faster using Resumly. The real-time preview and ATS-optimized templates are game-changers.",
        name: "Rohan Mehta",
        role: "Startup Founder",
        image: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200"
    },
    {
        text: "The step-by-step editor made resume building simple and stress-free. Highly recommended for job seekers.",
        name: "Jason Kim",
        role: "Product Designer",
        image: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&auto=format&fit=crop&q=60"
    },
    {
        text: "Resumly's templates helped me create a professional resume that stands out. The instant PDF download is super convenient.",
        name: "Alex Turner",
        role: "Full Stack Developer",
        image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=60"
    },
    {
        text: "I love how easy it is to customize sections and see changes live. Resumly really simplified the resume building process.",
        name: "Sofia Martinez",
        role: "UX Designer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&h=100&auto=format&fit=crop"
    },
    {
        text: "Using Resumly saved me hours of formatting and design work. I now have a polished, professional resume ready to apply to jobs.",
        name: "Daniel Wong",
        role: "UI Designer",
        image: "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/userImage/userImage1.png"
    }
];


    const rows = [
        { start: 0, end: 3, className: "animate-scroll" },
        { start: 3, end: 6, className: "animate-scroll-reverse" }
    ];

    const renderCard = (testimonial, index) => (
        <div key={index} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-[350px]">
            <div className="flex mb-4">
                
                {
                    Array(5).fill(0).map((item)=>(
                        <Star key={item.id} className='text-yellow-600 w-[15px] font-bold'/>
                    ))
                }
            </div>
            <p className="text-neutral-700 text-sm mb-6">{testimonial.text}</p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover"/>
                <div>
                    <p className="font-medium text-neutral-800 text-sm flex items-center">{testimonial.name} <span><Verified className='pl-1 text-blue-600 w-[18px]'/></span></p>
                    <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollReverse {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 15s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scrollReverse 15s linear infinite;
                    }
                `}
            </style>
            <section className="bg-[#FAFAFA] py-16 px-4 " id='testimonials'>
                <div className="max-w-6xl mx-auto">

                    <div className="text-center mb-8">
                        <div className="inline-block bg-neutral-100 border border-neutral-400 rounded-full px-4 py-1 mb-3">
                            <span className="text-xs text-neutral-600">Loved by clients</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-medium text-neutral-900 mb-4">
                            What Our Students Say
                        </h2>
                        <p className="text-neutral-600 text-sm max-w-96 mx-auto">
                           Join thousand of successful students who transformed their careers with us
                        </p>
                    </div>

                    <div className="space-y-6">
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                                <div className={`flex gap-6 ${row.className}`}>
                                    {[...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end)].map((testimonial, index) =>
                                        renderCard(testimonial, index)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonials
