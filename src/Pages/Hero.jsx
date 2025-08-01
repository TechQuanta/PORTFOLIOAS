import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { motion } from "framer-motion";
import { useTheme } from "../components/ThemeContext";
import CV from "../assets/cv.pdf";
import { FaUserAstronaut } from "react-icons/fa"; // About icon

function Hero() {
  
  const { theme, toggleTheme } = useTheme();
  const [scrollPosition, setScrollPosition] = useState(0);
  // Choose the appropriate theme icon based on the current theme
  const themeIcon = theme === "light" ? "https://github.com/user-attachments/assets/05bd1693-48f2-4219-bddc-5c01e3b93cdc" : "https://github.com/user-attachments/assets/be9a5b9f-8038-4800-9c81-6f9e21c73108";
  const githubIcon = theme === "light" ? "https://github.com/user-attachments/assets/45fe4d32-7896-49f9-a055-dbf4b91056f6" : "https://github.com/user-attachments/assets/8d829ee6-78de-402a-9ae0-4d3ca6cccc16";
  
  // Handle smooth scroll fade and translate effect
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const socialLinks = [
    {
      name: "GitHub",
      url: "https://github.com/ashmeet07",
      icon: githubIcon,
    },
    {
      name: "Kaggle",
      url: "https://www.kaggle.com/singhashmeet",
      icon: "https://github.com/user-attachments/assets/1ebb9a42-cb6b-4f13-9a1c-12e9f8e9236e",
    },
    {
      name: "Community",
      url: "https://github.com/techquanta",
      icon:"https://github.com/user-attachments/assets/acf4df93-eed2-4cde-91a6-0a85a581a44d",
    },
    {
      name: "Streamlit",
      url: "https://share.streamlit.io/user/ashmeet07",
      icon:"https://github.com/user-attachments/assets/1d65c88a-a531-4ce9-887e-8ff01e818f5b" ,
    },
    {
      name: "Tableau",
      url: "https://public.tableau.com/app/profile/ashmeet5175/vizzes",
      icon: "https://github.com/user-attachments/assets/99170283-3464-4953-8dab-c37466018ae1",
    },
  ];

  // Calculate opacity and translateY based on scroll position
  const opacity = Math.max(1 - scrollPosition / 500, 0); // Fades out slowly
  const translateY = Math.min(scrollPosition / 10, 80); // Moves up slowly

  const generateSnowflakes = (num) => {
    const generatedSnowflakes = [];
    for (let i = 0; i < num; i++) {
      generatedSnowflakes.push({
        key: i,
        xStart: Math.random() * 100,
        animationDuration: Math.random() * 20 + 20,
        opacity: Math.random() * 0.5 + 0.3,
        size: Math.random() * 3 + 2,
        blur: Math.random() * 2 + 1,
        driftDirection: Math.random() < 0.5 ? "left" : "right",
      });
    }
    return generatedSnowflakes;
  };

  const initialSnowflakes = generateSnowflakes(100); // Generate 100 snowflakes

  // Adjust snowflake fall speed based on scroll position
  const getSnowfallSpeed = () => {
    return Math.max(3, 8 - scrollPosition / 1000); // Slow down speed as user scrolls
  };

  const adjustedSnowflakes = initialSnowflakes.map((snowflake) => ({
    ...snowflake,
    animationDuration: getSnowfallSpeed() * (Math.random() * 1.5 + 0.5), // Add variation to snowflake speed
    size: snowflake.size * (Math.random() * 1.5 + 0.5), // Add variation to snowflake size
    glow: Math.random() > 0.7, // Some snowflakes will glow
  }));

  const generateShootingStars = (num) => {
    const stars = [];
    for (let i = 0; i < num; i++) {
      stars.push({
        key: i,
        xStart: Math.random() * 100,
        yStart: -Math.random() * 50,
        width: Math.random() * 2 + 1,
        length: Math.random() * 20 + 10,
        opacity: Math.random() * 0.7 + 0.3,
        duration: Math.random() * 2 + 3, // Slower for cinematic
      });
    }
    return stars;
  };

  const shootingStars = generateShootingStars(10); // Generate 10 shooting stars

  // Lightning Effect: Random flashes at intervals
  const [lightningVisible, setLightningVisible] = useState(false);
  const triggerLightning = () => {
    setLightningVisible(true);
    setTimeout(() => setLightningVisible(false), 300); // Hide lightning after 100ms
  };

  useEffect(() => {
    const lightningInterval = setInterval(
      triggerLightning,
      Math.random() * 5000 + 3000
    ); // Flash every 3-8 seconds
    return () => clearInterval(lightningInterval);
  }, []);
  return (
    <section
      id="hero"
      className={`flex flex-col items-center justify-center gap-5 w-screen text-center  min-h-[500px] h-[100dvh] md:flex-row-reverse md:justify-evenly md:items-center transition-all duration-300 ease-in-out relative overflow-hidden 
        ${
          theme === "light"
            ? "bg-gradient-to-r from-gray-300 to-white-400"
            : "bg-gradient-to-r from-gray-800 to-black"
        }`}
      style={{
        opacity: opacity,
        transform: `translateY(-${translateY}px)`,
      }}
    >
      {/* Animated Weather Effects */}
      <div className="absolute top-0 left-0 w-[91vw] h-[90vh] z-[-1] m-10 rounded-3xl backdrop-blur-xl bg-gradient-to-br from-pink-400/30 via-purple-500/30 to-blue-500/30 border-none border-white/20 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]">

        {adjustedSnowflakes.map(
          ({ key, xStart, animationDuration, opacity, size, blur, glow }) => (
            <motion.div
              key={`adjusted-snow-${key}`}
              className={`absolute bg-white rounded-full ${
                glow ? "glow-effect" : ""
              }`}
              style={{
                left: `${xStart}%`,
                width: `${size}px`,
                height: `${size}px`,
                opacity: opacity,
                filter: `blur(${blur}px)`,
              }}
              animate={{
                y: ["-5vh", "110vh"], // Slower descent
                x: ["0%", `${Math.random() > 0.5 ? 5 : -5}%`], // Wind drift
                opacity: [opacity, 0.2],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: animationDuration * 3,
                ease: "easeInOut",
              }}
            />
          )
        )}

        {Array.from({ length: 50 }).map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 5;
          return (
            <motion.div
              key={`rain-${i}`}
              className="absolute bg-blue-200"
              style={{
                left: `${left}%`,
                width: "1px",
                height: "20px",
                opacity: 0.3 + Math.random() * 0.4,
              }}
              animate={{
                y: ["-10vh", "110vh"],
                x: ["0%", `${Math.random() > 0.5 ? 1 : -1}%`],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 1.2,
                ease: "linear",
                delay,
              }}
            />
          );
        })}
        {shootingStars.map(
          ({ key, xStart, yStart, width, length, opacity, duration }) => (
            <motion.div
              key={`shoot-${key}`}
              className="absolute bg-white"
              style={{
                left: `${xStart}%`,
                top: `${yStart}vh`,
                width: `${width}px`,
                height: `${length}px`,
                opacity: opacity,
                transform: `rotate(${Math.random() > 0.5 ? 45 : -45}deg)`,
                borderRadius: "9999px",
              }}
              animate={{
                y: ["-10vh", "110vh"],
                x: [`${xStart}%`, `${xStart + 40 + Math.random() * 10}%`],
                opacity: [1, 0],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: duration + 1,
                ease: "easeInOut",
              }}
            />
          )
        )}
        {lightningVisible && (
          <div className="absolute top-0 left-0 w-full h-full bg-white opacity-40 z-[-2] transition-opacity duration-100 rounded-3xl" />
        )}
      </div>

      {/* Profile Section */}
      <div className="relative group w-[250px] md:w-[350px] lg:w-[400px]">
        <motion.img
          src="https://github.com/user-attachments/assets/43eb1ea1-a86a-4372-9b35-b49317863882"
          alt="Profile Pic"
          className="rounded-full shadow-lg"
          initial={{ rotate: 0 }}
          animate={{
            rotate: [0, 1, -1, 0],
            scale: [1, 1.02, 1],
            boxShadow:
              theme === "light"
                ? "0 0 20px rgb(255, 255, 255)"
                : "0 0 25px rgba(255, 255, 255, 0.97)",
          }}
          transition={{
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
          }}
        />
        <img
          className="absolute right-0 top-0 w-[25px] cursor-pointer hover:opacity-80"
          src={themeIcon}
          alt="Toggle Theme"
          onClick={toggleTheme}
        />
        <div className="absolute inset-0 pointer-events-none">
          <motion.img
            src="https://github.com/user-attachments/assets/b0ad0573-e50c-429f-8f0e-fa8c68f6e051"
            alt="Podman"
            className="w-[50px] absolute left-[-20px] top-[30%]"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.img
            src="https://github.com/user-attachments/assets/e573c1e5-3fbd-499e-9d8f-d0a79b4eac96"
            alt="Docker"
            className="w-[50px] absolute right-[-20px] bottom-[20%]"
            animate={{ y: [0, 15, 0] }}
            transition={{ repeat: Infinity, duration: 3.5 }}
          />
          <motion.img
            src="https://github.com/user-attachments/assets/acf4df93-eed2-4cde-91a6-0a85a581a44d"
            alt="Community"
            className="w-[50px] absolute left-[20%] bottom-[0%] rounded-full"
            animate={{ y: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 4.5 }}
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="flex flex-col gap-5 max-w-[70%] text-left">
        <h1
          className={`text-3xl font-semibold ${
            theme === "light" ? "text-white" : "text-white"
          }`}
        >
          Ashmeet Singh
        </h1>
        <div
          className={`text-md font-mono ${
            theme === "light"
              ? "text-neutral-900 glow-dark"
              : "text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-indigo-500 bg-clip-text glow-purple"
          }`}
        >
          <Typewriter
            options={{
              strings: [
                "Software Developer",
                "Data Science Enthusiast",
                "ML Enthusiast",
                "Data Enthusiast",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <span className="flex gap-6 justify-center">
          {socialLinks.map(({ name, url, icon }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              title={name}
            >
              <img
                src={icon}
                alt={`${name} icon`}
                className={`w-[30px] ${
                  name === "Community" ? "rounded-md" : ""
                }`}
              />
            </a>
          ))}
        </span>
        <p className="max-w-[34ch] dark:text-white">
          Create modern Apps with a growing passion for Software Development by
          rendering Data Analysis.
        </p>
       <a href="https://docs.google.com/document/d/1OqQrzbp6qG6txb3vlT_U4ldo2L1FEsUKpIw7WaCzn0w/edit?usp=sharing" download>
  <button
    className={`
      relative w-[130px] h-[40px] rounded-full text-lg font-semibold
      overflow-hidden
      transition-all duration-300 ease-in-out
      group // Added 'group' class to enable group-hover effects
      ${
        theme === "light"
          ? "bg-gradient-to-r from-white via-white to-purple-300 text-black shadow-lg"
          : "bg-gradient-to-r from-indigo-500 to-purple-900 text-white shadow-md"
      }
     hover:shadow-2xl active:scale-95 active:translate-y-1
    `}
  >
    {/* Default content: Resume text and original icon - now fades out on hover */}
    <span className="z-10 relative flex items-center justify-center w-full h-full transition-opacity duration-300 group-hover:opacity-0">
      <span className="text-xl">🗃️</span>
      <span>Resume</span>
    </span>

    {/* Hover content: Inline SVG Download icon - fades in on hover */}
    <span className="absolute inset-0 z-0 flex items-center justify-center text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </span>

    {/* Shimmer effect - fades out on hover */}
    <motion.div
      className="absolute inset-0 opacity-10 group-hover:opacity-0 transition-opacity duration-300"
      animate={{ x: ["-100%", "100%"] }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      style={{
        background:
          theme === "light"
            ? "linear-gradient(120deg, white, yellow)"
            : "linear-gradient(120deg, white, purple)",
      }}
    />

    {/* Background overlay - becomes transparent on hover */}
    <span
      className={`
        absolute inset-0
        ${
          theme === "light"
            ? "bg-gradient-to-r from-white via-white to-purple-300"
            : "bg-gradient-to-r from-indigo-500 to-purple-900"
        }
        opacity-10 group-hover:opacity-0 // Make background transparent on hover
        transition-opacity duration-300
      `}
    ></span>
  </button>
</a>
<button
  onClick={() => (window.location.href = "https://singhashmeet.vercel.app/")}
  className="absolute top-5 left-5 lg:left-auto lg:right-5 z-50 px-4 py-2 flex items-center gap-2 rounded-full text-white bg-gradient-to-r dark:text-gray-800 dark:bg-gradient-to-r from-blue-500 dark:from-blue-600 via-purple-400 dark:via-gray-200 to-gray-200 dark:to-purple-700 hover:animate-waterGlow shadow-xl"
>
  <FaUserAstronaut className="text-lg" />
  <span className="font-semibold"></span>
</button>

      </div>
    </section>
  );
}

export default Hero;
