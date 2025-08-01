import { useEffect, useState } from "react";
import Avatar from "../components/Character/CharacterRings";
import { FaUserAstronaut } from "react-icons/fa"; // About icon

const AboutMe = () => {
  // const [, setRotation] = useState(0);

  const [setAngle] = useState(() => {
    const stored = localStorage.getItem("ringAngle");
    return stored ? parseFloat(stored) : 0;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((prev) => {
        const next = prev + 0.3;
        localStorage.setItem("ringAngle", next.toFixed(2));
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-white to-gray-200 dark:from-black dark:to-gray-900 text-black dark:text-white flex items-center justify-center">
      {/* Top Left Profile Icon */}
      <div className="absolute top-5 left-5 z-50">
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQF1TgEU14yi-g/profile-displayphoto-shrink_400_400/B4DZcI_vVaGYAg-/0/1748202618197?e=1753920000&v=beta&t=4mPCC2YRA4rGfLAOT8gYrCB7hyuMPRXjvrz0LzT1TAA"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-400 shadow-lg "
        />
      </div>

      {/* Top Right About Button */}
      <button
  onClick={() => (window.location.href = "https://singhashmeet.vercel.app/")}
  className="absolute top-5 right-5 z-50 px-4 py-2 flex items-center gap-2 rounded-full text-white bg-gradient-to-r  dark:text-gray-800 dark:bg-gradient-to-r  from-blue-500 dark:from-blue-600 via-purple-400 dark:via-gray-200  to-gray-200 dark:to-purple-700 hover:animate-waterGlow shadow-xl"
>
  <FaUserAstronaut className="text-lg" />
  <span className="font-semibold"></span>
</button>


      {/* Stars */}
      <div className="stars z-10">
        {[...Array(50)].map((_, i) => (
          <div key={i} className="star" />
        ))}
      </div>

      {/* Sunlight Overlay */}
      <div className="sunlight-overlay z-20 pointer-events-none"></div>

      {/* Central Avatar */}
      <Avatar />

      {/* Style Section */}
      <style>{`
        ${[...Array(50)].map((_, i) => {
          const size = (Math.random() * 1.5 + 3.5).toFixed(2);
          const top = Math.random() * 100;
          const left = Math.random() * 100;
          const twinkleDelay = Math.random() * 10;
          const twinkleDuration = (Math.random() * 100).toFixed(2);
          const driftDelay = Math.random() * 5;
          const driftDuration = (Math.random() * 30 + 60).toFixed(2);
          const blur = size * 4;

          return `
            .star:nth-child(${i + 1}) {
              width: ${size}px;
              height: ${size}px;
              top: ${top}%;
              left: ${left}%;
              box-shadow: 0 0 ${blur}px white;
              animation: twinkle ${twinkleDuration}s ease-in-out ${twinkleDelay}s infinite,
                         drift ${driftDuration}s ease-in-out ${driftDelay}s infinite;
            }
          `;
        }).join("")}
      `}</style>
    </div>
  );
};

export default AboutMe;
