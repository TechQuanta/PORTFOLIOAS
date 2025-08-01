import { motion } from "framer-motion";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

// Import your images

export default function ProjectCard({
  title,
  description,
  videoSrc,
  github,
  docker,
  website,
}) {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const updateTheme = () => {
      const theme = document.documentElement.classList.contains("dark");
      setIsDarkTheme(theme);
    };
  
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  
    updateTheme(); // initial call
  
    return () => observer.disconnect();
  }, []);
  

  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const size = Math.random() * 3 + 1; // random size for stars
      const left = Math.random() * 100; // random horizontal position
      const top = Math.random() * 100; // random vertical position
      const animationDelay = Math.random() * 2; // random delay for animation
      stars.push(
        <motion.div
          key={i}
          className="absolute rounded-full bg-white dark:bg-gray-500"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            width: `${size}px`,
            height: `${size}px`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            opacity: {
              repeat: Infinity,
              repeatType: "mirror",
              duration: 2 + Math.random() * 3, // random duration for blink
              delay: animationDelay,
            },
          }}
        />
      );
    }
    return stars;
  };

  return (
    <>
    <div className="absolute -top-[4.5%] left-[57.18%] w-[0.3%] h-[0.5%] rounded-full bg-red-900 animate-ping overflow-hidden" />
    <div className="absolute -top-[4.5%] left-[52.78%] w-[1%] h-[1%] rounded-full bg-white overflow-hidden" />
    <div
      className="w-full h-full bg-white dark:bg-zinc-800 shadow-xl flex flex-col justify-between overflow-hidden transform transition-all duration-500"
      style={{ perspective: "1000px" }}
    >
      {/* Sunrise or Moonrise Background Animation */}
        {/* Absolute "Beep Light Red" indicator */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500 via-yellow-200 to-transparent dark:bg-gradient-to-r dark:from-gray-200 dark:via-gray-200 dark:to-transparent dark:top-0 dark:left-0 dark:w-[100%] dark:h-full"
        initial={{ x: "-80%" }}
        animate={{ x: "0%" }}
        transition={{ duration: 4, ease: "easeOut" }}
        style={{
          zIndex: -1,
        }}
      />

      {/* Stars Background */}
      <div className="absolute top-0 left-0 w-full h-full">
        {generateStars(50)}
      </div>

      {/* Motion on video/image carousel */}
      <motion.div
  className="relative w-full h-full overflow-hidden rounded-b-xl group"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* Glowing border wrapper */}
  <div className="absolute left-[0%] top-[5%]  w-[100%] h-[100%] overflow-hidden flex justify-center items-center rounded-md bg-transparent transition-shadow duration-500 rounded-lg">
    {videoSrc ? (
      <video
        src={videoSrc}
        className="w-[100%] h-[100%]  transition-transform duration-700 ease-out "
        autoPlay
        muted
        loop
        playsInline
      />
    ) : (
      <div className="w-full h-full flex items-center justify-center text-white bg-zinc-900 text-sm rounded-md">
        <p>No video available</p>
      </div>
    )}
  </div>

  {/* Optional hover overlay effect */}
  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-0 transition-opacity duration-500 pointer-events-none rounded-b-xl" />
</motion.div>



      {/* Motion on content */}
      <motion.div
  className="p-4 justify-center items-center text-center sm:p-5 md:p-6 h-[40vh] sm:h-[40vh] md:h-[40vh] text-left overflow-hidden backdrop-blur-sm relative"
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
>
  <motion.h3
    className="font-semibold text-transparent bg-clip-text bg-gradient-to-r 
    from-gray-800 via-red-400 to-black 
              dark:from-gray-800 dark:via-green-900 dark:to-black 
              text-[clamp(1rem,2vw,1.5rem)] sm:text-[clamp(1.1rem,2.3vw,0.6rem)]"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
  >
    {title}
  </motion.h3>

  <motion.div
    className="mt-2 max-h-[6rem] sm:max-h-[6rem] md:max-h-[6rem] overflow-y-auto pr-2 custom-scroll text-transparent bg-clip-text bg-gradient-to-r 
              from-gray-800 via-red-400 to-black 
              dark:from-gray-800 dark:via-green-900 dark:to-black 
               text-[clamp(0.85rem,1.4vw,1.05rem)] sm:text-[clamp(0.9rem,1.5vw,1.0rem)] leading-relaxed tracking-wide"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
  >
    {description}
  </motion.div>

  {/* Action links */}
  <div className="absolute right-2 bottom-2 flex space-x-3 text-gray-500 dark:text-gray-300 ">
    {github && (
      <motion.a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black dark:hover:text-white transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img
          src="https://github.com/user-attachments/assets/45fe4d32-7896-49f9-a055-dbf4b91056f6"
          alt="GitHub"
          className="w-5 h-5 sm:w-6 sm:h-6 dark:hidden"
        />
        <img
          src="https://github.com/user-attachments/assets/8d829ee6-78de-402a-9ae0-4d3ca6cccc16"
          alt="GitHub"
          className="w-5 h-5 sm:w-6 sm:h-6 hidden dark:block"
        />
      </motion.a>
    )}
    {docker && (
      <motion.a
        href={docker}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black dark:hover:text-white transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img
          src="https://github.com/user-attachments/assets/e573c1e5-3fbd-499e-9d8f-d0a79b4eac96"
          alt="Docker"
          className="w-5 h-5 sm:w-6 sm:h-6 dark:hidden"
        />
        <img
          src="https://github.com/user-attachments/assets/e573c1e5-3fbd-499e-9d8f-d0a79b4eac96"
          alt="Docker"
          className="w-5 h-5 sm:w-6 sm:h-6 hidden dark:block"
        />
      </motion.a>
    )}
    {website && (
      <motion.a
        href={website}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-black dark:hover:text-white transition-colors"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <img
          src="https://github.com/user-attachments/assets/e1a85204-302e-46e1-9e78-d31058b5f8e5"
          alt="Website"
          className="w-5 h-5 sm:w-6 sm:h-6 dark:hidden"
        />
        <img
          src="https://github.com/user-attachments/assets/e1a85204-302e-46e1-9e78-d31058b5f8e5"
          alt="Website"
          className="w-5 h-5 sm:w-6 sm:h-6 hidden dark:block"
        />
      </motion.a>
    )}
  </div>
</motion.div>

    </div>
    </>
  );
}

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  videoSrc: PropTypes.string.isRequired,
  github: PropTypes.string,
  docker: PropTypes.string,
  website: PropTypes.string,
};
