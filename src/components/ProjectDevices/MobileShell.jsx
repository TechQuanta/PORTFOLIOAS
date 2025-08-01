import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function MobileShell({ projects }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [draggedX, setDraggedX] = useState(0);
  const [direction, setDirection] = useState(null);

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.clientX || e.touches[0].clientX);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (draggedX > 100) {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    } else if (draggedX < -100) {
      setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    }
    setDraggedX(0);
  };

  const handleDrag = (e) => {
    if (isDragging) {
      const moveX = (e.clientX || e.touches[0].clientX) - startX;
      setDraggedX(moveX);
      setDirection(moveX > 0 ? "right" : "left");
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isDragging) {
        setCurrentIndex((prev) => (prev + 1) % projects.length); // Auto slide after 5 seconds if not dragging
      }
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer); // Clean up the timer on component unmount
  }, [projects.length, isDragging]);

  const project = projects[currentIndex];

  return (
    <div className="w-full h-full flex justify-center items-center overflow-hidden">
      <div className="relative w-full h-full">
        <div
          className="w-full h-full flex items-center justify-center"
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
          onMouseMove={handleDrag}
          onTouchMove={handleDrag}
        >
          <motion.div
            className="relative w-[85vw] max-w-[380px] p-1 sm:p-2 rounded-xl shadow-lg border-[2px] border-transparent dark:border-neutral-800 bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-pink-500/40 backdrop-blur-lg"
            initial={{ opacity: 0, x: "100%" }} // Start from the right
            animate={{
              opacity: 1,
              x: 0,
              transition: { type: "spring", stiffness: 300, damping: 30 },
            }} // Slide in from the right
            exit={{ opacity: 0, x: "-100%" }} // Slide out to the left
            style={{
              x: draggedX,
              cursor: isDragging ? "grabbing" : "grab", // Change cursor while dragging
            }}
          >
            {/* Video */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <video
                src={project.videoSrc}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-auto object-cover transition-transform duration-500 ease-out"
              />
            </div>

            {/* Project Info */}
            <div className="bg-white/10 dark:bg-black/40 backdrop-blur-xl rounded-b-xl p-4 text-white dark:text-white">
              <h3 className="text-lg sm:text-xl font-semibold text-black dark:text-white">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-black/80 dark:text-white/80">
                {project.description}
              </p>

              {/* Icons */}
              <div className="mt-4 flex items-center space-x-4">
                {/* GitHub */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-md hover:scale-110 transition-all"
                >
                  <i className="fab fa-github text-xl text-black dark:text-white"></i>
                </a>

                {/* Website */}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-md hover:scale-110 transition-all"
                  >
                    <i className="fas fa-globe text-xl text-black dark:text-white"></i>
                  </a>
                )}

                {/* Docker */}
                {project.docker && (
                  <a
                    href={project.docker}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/80 dark:bg-black/80 rounded-full shadow-md hover:scale-110 transition-all"
                  >
                    <i className="fab fa-docker text-xl text-black dark:text-white"></i>
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

MobileShell.propTypes = {
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      videoSrc: PropTypes.string,
      github: PropTypes.string.isRequired,
      website: PropTypes.string,
      docker: PropTypes.string,
    })
  ).isRequired,
};
