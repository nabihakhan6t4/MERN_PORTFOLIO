import React, { useEffect, useState } from "react";

const About = () => {
  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      <div className="relative">
        <h1
          className="flex gap-4 items-center text-[2rem] sm:text-[2.75rem] 
          md:text-[3rem] lg:text-[3.8rem] leading-[56px] md:leading-[67px] 
          lg:leading-[90px] tracking-[15px] mx-auto w-fit font-extrabold about-h1"
          style={{
            background: "hsl(222.2 84% 4.9%)",
          }}
        >
          ABOUT <span className="text-tubeLight-effect font-extrabold">ME</span>
        </h1>
        <span className="absolute w-full h-1 top-7 sm:top-7 md:top-8 lg:top-11 z-[-1] bg-slate-200"></span>
      </div>
      <div className="text-center">
        <p className="uppercase text-xl text-slate-400">
          Allow me to introduce myself.
        </p>
      </div>
      <div>
        <div className="grid md:grid-cols-2 my-8 sm:my-20 gap-14">
          <div className="flex justify-center items-center">
            <img
              src="nabiha-black.jpg"
              alt="avatar"
              className="bg-white p-2 sm:p-4 rotate-[25deg] h-[240px] sm:h-[340px] md:h-[350px] lg:h-[450px]"
            />
          </div>
          <div className="flex justify-center flex-col tracking-[1px] text-xl gap-5">
            <p>
              Hey! I’m Nabiha Khan, a passionate and detail-oriented Frontend
              Developer from Karachi, Pakistan 🌍. I specialize in building
              modern, responsive, and visually stunning websites using HTML,
              CSS, JavaScript, React, Bootstrap, and Tailwind CSS 💻. Every
              project is a journey for me to solve complex problems and
              transform ideas into beautiful digital solutions ✨. Whether it’s
              a simple webpage or an intricate design, I strive to make every
              line of code count 💡.
            </p>
            <p>
              Right now, I’m diving deep into the MERN stack 🔍, sharpening my
              skills to work on full-stack projects that enhance both user
              experience and backend functionality 🚀. My focus is on creating
              robust applications that offer dynamic and responsive web
              experiences. I’m exploring new technologies and working on
              real-world projects to expand my toolset ⚙️.
            </p>
          </div>
        </div>
        <p className="tracking-[1px] text-xl">
          Looking ahead, my goal is to evolve into a professional full-stack
          developer 👩‍💻, creating impactful web applications that solve real
          problems 🌱. I believe in continuous learning 📚 and love
          collaborating on projects that push me to grow 💪. Every challenge is
          an opportunity to learn and improve, and I’m here for it 💫.
        </p>
      </div>
    </div>
  );
};

export default About;
