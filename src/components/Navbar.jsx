import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { BiHome, BiCodeAlt, BiUser, BiMailSend, BiShow, BiHide } from "react-icons/bi";
import { motion } from "framer-motion";

export default function Navbar({ loading }) {
  const [isOpen, setIsOpen] = useState(window.innerWidth > 640);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 640;
      setIsMobile(mobile);
      setIsOpen(!mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems = [
    { to: "/", icon: <BiHome size={28} />, label: "Home" },
    { to: "/projects", icon: <BiCodeAlt size={28} />, label: "Artifacts" },
    { to: "/about", icon: <BiUser size={28} />, label: "Skills" },
    { to: "/contact", icon: <BiMailSend size={28} />, label: "Messenger" },
  ];

  const glassyBtn = `
    w-[64px] h-[64px] flex items-center justify-center rounded-full 
    bg-gradient-to-br from-[#0f172a]/30 to-[#1e293b]/20 dark:from-[#1e1b4b]/40 dark:to-[#0f172a]/10
    border border-white/10 dark:border-white/10 
    shadow-[0_0_20px_rgba(0,0,0,0.2)] 
    backdrop-blur-xl transition-all 
    hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.2)]
    relative overflow-hidden text-white dark:text-gray-300`;

  const activeBtn = `
    bg-gradient-to-br from-[#6366f1] to-[#3b82f6] 
    dark:from-[#facc15] dark:to-[#f59e0b] 
    text-white scale-110 ring-2 ring-white/30 shadow-lg`;

  const toggleBtn = `
    w-[60px] h-[60px] flex items-center justify-center rounded-full
    bg-gradient-to-tr from-[#0f172a] to-[#1e3a8a] dark:from-[#3b0764] dark:to-[#7e22ce]
    shadow-lg text-white hover:scale-110 transition`;

  const handleRippleEffect = (e) => {
    const ripple = document.createElement("span");
    const size = Math.max(e.target.offsetWidth, e.target.offsetHeight);
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple");
    e.target.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed bottom-5 right-5 z-[999] flex flex-col-reverse items-end gap-4"
    >
      {isMobile && (
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          onMouseDown={handleRippleEffect}
          className={toggleBtn}
          aria-label="Toggle Navbar"
        >
          <motion.span
            key={isOpen ? "hide" : "show"}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="text-orange-300"
          >
            {isOpen ? <BiHide size={28} /> : <BiShow size={28} />}
          </motion.span>
        </motion.button>
      )}

      {isOpen && (
        <motion.div
          key="nav-items"
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="flex flex-col gap-4 items-end"
        >
          {navItems.map(({ to, icon, label }, idx) => (
            <NavLink
              key={idx}
              to={to}
              onMouseDown={handleRippleEffect}
              className={({ isActive }) =>
                `${glassyBtn} ${isActive ? activeBtn : ""}`
              }
              aria-label={label}
            >
              <span className="z-10">{icon}</span>
            </NavLink>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
}
