import PropTypes from "prop-types";
import { useState, useEffect, useCallback } from "react";
import ProjectCard from "./ProjectCard"; // ✅ Adjust the path as needed

export default function LaptopShell({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [glow, setGlow] = useState(false);
  const [showBalloons, setShowBalloons] = useState(false);

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

  const triggerGlow = () => {
    setGlow(true);
    setShowBalloons(true);
    setTimeout(() => {
      setGlow(false);
      setShowBalloons(false);
    }, 3000);
  };

  const project = projects[currentIndex];

  return (
    <div
      className="w-full flex justify-center items-center "
      onClick={triggerGlow}
      onTouchStart={triggerGlow}
    >
      <div className="relative w-full aspect-[16/10] flex justify-center items-center">
        {/* Laptop SVG */}
        <img
          src="https://github.com/user-attachments/assets/3e0500a2-4f57-49fc-9ad3-057cd53e0369"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0 hidden dark:block"
        />
        <img
          src="https://github.com/user-attachments/assets/3e0500a2-4f57-49fc-9ad3-057cd53e0369"
          className="absolute inset-0 w-full h-full object-contain pointer-events-none select-none z-0 block dark:hidden"
        />

        {/* Laptop Screen */}
        <div
          className="absolute z-10"
          style={{
            top: "22.6%",
            left: "26.1%",
            width: "47.7%",
            height: "43%",
          }}
        >
          <ProjectCard
    title={project.title}
    description={project.description}
    videoSrc={project.videoSrc}
    github={project.github}
    docker={project.docker}
    website={project.website}
    image={project.image} // Ensure this is passed correctly
  />
        </div>

        {/* Left Arrow Key */}
        <div
          className={`absolute z-20 w-[2.6%] h-[0.6%] bg-zinc-300 dark:bg-zinc-700 border border-none text-black dark:text-white flex items-center justify-center font-mono text-base font-semibold rounded-[1px] ${
            glow ? "animate-glow-right" : ""
          }`}
          style={{
            bottom: "26%",
            left: "56.1%",
          }}
        >
          ←
          {showBalloons && (
            <div className="absolute w-10 -top-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 z-[9999] bg-pink-500 text-white text-xs px-4 py-2 rounded-full shadow-md whitespace-nowrap">
                Forgot your
              </div>
              <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-600 rotate-45 mt-[1px]"></div>
            </div>
          )}
        </div>

        {/* Right Arrow Key */}
        <div
          className={`absolute z-20 w-[2.6%] h-[0.6%] bg-zinc-300 dark:bg-zinc-700 border border-none text-black dark:text-white flex items-center justify-center font-mono text-base font-semibold rounded-[1px] ${
            glow ? "animate-glow-right" : ""
          }`}
          style={{
            bottom: "26%",
            left: "62.5%",
          }}
        >
          →
          {showBalloons && (
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center">
              <div className="text-[10px] px-2 py-[2px] rounded-full shadow-md bg-indigo-500 dark:bg-indigo-600 text-white font-semibold whitespace-nowrap">
                arrow keys?
              </div>
              <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-600 rotate-45 mt-[1px]"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

LaptopShell.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      videoSrc: PropTypes.string,
      github: PropTypes.string,
      website: PropTypes.string,
      docker: PropTypes.string,
      image: PropTypes.string,
    })
  ).isRequired,
};
