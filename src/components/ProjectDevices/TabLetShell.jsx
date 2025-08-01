import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react"; // Ensure the correct path
import ProjectCard from "./ProjectCard"; // ✅ Adjust the path as needed

export default function TabletShell({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
      }
    },
    [projects.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const project = projects[currentIndex];

  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full max-w-full h-full flex justify-center items-center">
        {/* Tablet SVG */}
        <img
          src="https://github.com/user-attachments/assets/a18ad52b-5d1a-401e-9a14-f4cbdac9ccba"
          alt="Tablet Dark Shell"
          className="relative inset-0 w-full h-full object-contain pointer-events-none select-none z-0 hidden dark:block"
        />
        <img
          src="https://github.com/user-attachments/assets/a18ad52b-5d1a-401e-9a14-f4cbdac9ccba"
          alt="Tablet Light Shell"
          className="relative inset-0 w-full h-full object-contain pointer-events-none select-none z-0 block dark:hidden"
        />

        {/* Tablet Screen - Responsive Layout */}
        <div
          className="absolute z-10 bg-black dark:bg-zinc-900 rounded-lg overflow-hidden"
          style={{
            top: "15.89%",
            left: "28%",
            width: "43.8%",
            height: "63%",
          }}
        >
           <div className="absolute  top-0 bottom-0 z-20 w-full h-full flex justify-center items-center rounded-md">
            {/* 🎥 Dedicated Video Div */}
            <div className="w-[95%] h-[50%] absolute top-[10%] overflow-hidden rounded-lg  bg-transparent">
              <video
                src={project.videoSrc}
                className="w-full h-full rounded-[90px] group-hover:scale-105  duration-700 ease-out"
                autoPlay
                muted
                loop
                playsInline
              />
              {/* Optional overlay or gradient */}
              <div className="absolute inset-0  from-black/60 to-transparent pointer-events-none" />
            </div>
          </div>
          <div className="h-full w-full flex justify-center items-center rounded-lg">
            {/* Responsive Project Card */}
            <div className="w-full h-full flex justify-center items-center">
              <ProjectCard
                title={project.title}
                description={project.description}
                github={project.github}
                docker={project.docker}
                website={project.website}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

TabletShell.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      videoSrc: PropTypes.string,
      github: PropTypes.string,
      docker: PropTypes.string,
      website: PropTypes.string,
    })
  ).isRequired,
};
