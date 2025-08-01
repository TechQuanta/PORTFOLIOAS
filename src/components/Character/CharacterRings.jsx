import {
  FaReact,
  FaCode,
  FaGithub,
  FaJava,
  FaPython,
  FaDocker,
  FaJs,
  FaNodeJs,
  FaDatabase,
  FaHtml5,
  FaCss3Alt,
} from "react-icons/fa"; // You can add more icons for better variety
import { useEffect, useState } from "react";

const ICONS = [FaReact, FaCode, FaGithub, FaJava, FaPython, FaJs, FaDocker, FaNodeJs, FaDatabase, FaHtml5, FaCss3Alt];

const CharacterRings = () => {
  const [rotation, setRotation] = useState(0);
  const [baseHue, setBaseHue] = useState(200);
  const [triggerColorShift, setTriggerColorShift] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(
    "https://github.com/user-attachments/assets/410eaeee-b040-4e50-974b-e1388afe36ad"
  );
  const [iconIndex, setIconIndex] = useState(0); // ➡️ Added this state

  // Dynamic Avatar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setAvatarSrc(
          "https://github.com/user-attachments/assets/4b3a5349-c0dd-4785-8ee9-2ed2287d6952"
        );
      } else if (window.innerWidth < 1366) {
        setAvatarSrc(
          "https://github.com/user-attachments/assets/7ff377b7-1730-4bf1-9e74-894a47cdd8f6"
        );
      } else {
        setAvatarSrc(
          "https://github.com/user-attachments/assets/410eaeee-b040-4e50-974b-e1388afe36ad"
        );
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔥 Rotate Rings
  useEffect(() => {
    const rotateInterval = setInterval(() => {
      setRotation((prev) => prev + 1.5);
    }, 100);
    return () => clearInterval(rotateInterval);
  }, []);
  useEffect(() => {
    const hueInterval = setInterval(() => {
      setBaseHue((prevHue) => (prevHue + 1) % 360); // change 1 degree every frame
    }, 100); // every 100ms, smooth hue shift
  
    return () => clearInterval(hueInterval);
  }, []);
  useEffect(() => {
    const hueInterval = setInterval(() => {
      setBaseHue((prevHue) => (prevHue + 1) % 360);
    }, 100); // Adjust speed here: lower = faster color shift
  
    return () => clearInterval(hueInterval);
  }, []);
    
  // 🔥 Auto Change Icons Every 5 Seconds
  useEffect(() => {
    const iconChangeInterval = setInterval(() => {
      setIconIndex((prevIndex) => (prevIndex + 1) % ICONS.length);
    }, 300); // change every 5 seconds
    return () => clearInterval(iconChangeInterval);
  }, []);

  const handleAvatarClick = () => {
    setTriggerColorShift(true);
    setBaseHue((prevHue) => (prevHue + 95) % 360);
    setTimeout(() => setTriggerColorShift(false), 3000);
  };

  // 🔥 Auto-Assign different icons based on index
  const rings = Array(7).fill(null).map((_, i) => ({
    Icon: ICONS[(iconIndex + i) % ICONS.length], // cyclically shift icons
    radius: 120 + i * 25,
    rotateX: 15 + i * 10,
    speed: 0.2 + i * 0.05,
    size: 270 + i * 35,
    animationName: `orbitRing${i + 1}`,
    color: `hsla(${(baseHue + i * 40) % 360}, 100%, 70%, 0.6)`,
    front: i % 2 === 0,
  }));

  // 🧠 your renderRing() and rest code remains same

  // (keep your renderRing function and return JSX the same)


  const renderRing = (ring, i, position) => {
    const { Icon, radius, rotateX, speed, size, animationName, color } = ring;
    const angle = (rotation * speed) % 360;
    const rad = (angle * Math.PI) / 180;
    const x = radius * Math.cos(rad);
    const y = radius * Math.sin(rad);

    return (
      <div
        key={`${position}-${i}`}
        className={`absolute top-1/2 left-1/2 pointer-events-none z-${
          position === "front" ? 50 : 20
        } ${position === "front" && triggerColorShift ? `ring-fade-${i}` : ""}`}
        style={{
          transformStyle: "preserve-3d",
          transform: `translate(-50%, -50%) rotateX(${rotateX}deg)`,
          animation: `${animationName} ${30 - i * 2}s linear infinite`,
          width: `${size}px`,
          height: `${size}px`,
          borderRadius: "50%",
          border: `2px dashed ${color}`,
          boxShadow: `0 0 25px ${color}`,
          opacity: 0.5,
        }}
      >
        <div
          className="absolute  text-white dark:text-purple-100 text-[3rem]"
          style={{
            transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            top: "50%",
            left: "50%",
            filter: `drop-shadow(0 0 6px ${color})`,
          }}
        >
          <div className={`ring-icon-${i}`}>
            <Icon />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative flex items-center justify-center w-full h-full overflow-hidden">
      {/* Back Rings */}
      {rings.filter((r) => !r.front).map((r, i) => renderRing(r, i, "back"))}

      {/* Avatar */}
      <div
        onClick={handleAvatarClick}
        className="absolute z-20 w-[220px] h-[220px] md:w-[260px] md:h-[260px] rounded-full overflow-hidden border-4 border-blue-900/20 backdrop-blur-md dark:bg-black/100 bg-white/10 shadow-2xl animate-float cursor-pointer transition-all duration-500 hover:scale-105"
      >
        <img
          src={avatarSrc}
          alt="Avatar"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Front Rings */}
      {rings.filter((r) => r.front).map((r, i) => renderRing(r, i, "front"))}

      <style>{`
         ${[...Array(8)]
          .map(
            (_, i) => `
            /* 1. Smooth 3D Orbit Ring Animation */
            @keyframes orbitRing${i + 1} {
              0% {
                transform:
                  perspective(1500px)
                  translate(-50%, -50%)
                  rotateX(${18 + i * 7}deg)
                  rotateY(0deg)
                  rotateZ(0deg);
              }
              25% {
                transform:
                  perspective(1500px)
                  translate(-50%, -50%)
                  rotateX(${22 + i * 7}deg)
                  rotateY(90deg)
                  rotateZ(90deg);
              }
              50% {
                transform:
                  perspective(1500px)
                  translate(-50%, -50%)
                  rotateX(${18 + i * 7}deg)
                  rotateY(180deg)
                  rotateZ(180deg);
              }
              75% {
                transform:
                  perspective(1500px)
                  translate(-50%, -50%)
                  rotateX(${22 + i * 7}deg)
                  rotateY(270deg)
                  rotateZ(270deg);
              }
              100% {
                transform:
                  perspective(1500px)
                  translate(-50%, -50%)
                  rotateX(${18 + i * 7}deg)
                  rotateY(360deg)
                  rotateZ(360deg);
              }
            }
        
            /* 2. Ring Color Fade & Soft Glow */
            .ring-fade-${i} {
              animation: fade-color-${i} 4s ease-in-out forwards;
              animation-delay: ${i * 0.25}s;
            }
        
            @keyframes fade-color-${i} {
              0% {
                border-color: hsla(${(210 + i * 30) % 360}, 100%, 65%, 0.5);
                box-shadow: 0 0 10px hsla(${(210 + i * 30) % 360}, 100%, 60%, 0.3),
                            0 0 20px hsla(${(210 + i * 30) % 360}, 100%, 60%, 0.4) inset;
              }
              50% {
                border-color: hsla(${(210 + i * 30 + 10) % 360}, 100%, 80%, 0.7);
                box-shadow: 0 0 20px hsla(${(210 + i * 30 + 10) % 360}, 100%, 70%, 0.5),
                            0 0 30px hsla(${(210 + i * 30 + 10) % 360}, 100%, 70%, 0.6) inset;
              }
              100% {
                border-color: hsla(${(210 + i * 30 + 20) % 360}, 100%, 90%, 0.9);
                box-shadow: 0 0 30px hsla(${(210 + i * 30 + 20) % 360}, 100%, 80%, 0.7),
                            0 0 40px hsla(${(210 + i * 30 + 20) % 360}, 100%, 80%, 0.8) inset;
              }
            }
        
            /* 3. Icon Floating & Tilting in 3D */
            .ring-icon-${i} {
              animation: icon-tilt-${i} ${24 - i * 1.5}s ease-in-out infinite alternate;
              transform-style: preserve-3d;
              backface-visibility: hidden;
              will-change: transform;
            }
        
            @keyframes icon-tilt-${i} {
              0% {
                transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
              }
              20% {
                transform: rotateX(15deg) rotateY(20deg) rotateZ(5deg) translateZ(5px);
              }
              50% {
                transform: rotateX(-15deg) rotateY(-20deg) rotateZ(-5deg) translateZ(-5px);
              }
              80% {
                transform: rotateX(10deg) rotateY(15deg) rotateZ(3deg) translateZ(3px);
              }
              100% {
                transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) translateZ(0px);
              }
            }
          `
          )
          .join("")}
        `}
        </style>
    </div>
  );
};

export default CharacterRings;
