import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

// ⚡ New Sword Animation (3D fold + spin)
const swordAnimations = [
  {
    left: {
      scaleY: 0.2,
      scaleX: 0.5,
      opacity: 0,
      x: -300,
      rotateY: 70,
      rotateZ: 0,
    },
    right: {
      scaleY: 0.2,
      scaleX: 0.5,
      opacity: 0,
      x: 300,
      rotateY: -70,
      rotateZ: 0,
    },
    finalLeft: {
      scaleY: 1,
      scaleX: 1,
      opacity: 1,
      x: 0,
      rotateY: 0,
      rotateZ: -45,
      transition: { type: "spring", stiffness: 140, damping: 10 }
    },
    finalRight: {
      scaleY: 1,
      scaleX: 1,
      opacity: 1,
      x: 0,
      rotateY: 0,
      rotateZ: 45,
      transition: { type: "spring", stiffness: 140, damping: 10 }
    },
    spinLeft: {
      rotateZ: -45 + 360, // Spin around once
      transition: { duration: 2, ease: "easeInOut" }
    },
    spinRight: {
      rotateZ: 45 - 360,
      transition: { duration: 2, ease: "easeInOut" }
    }
  },
];

export default function Layout() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [animationIndex, setAnimationIndex] = useState(0);
  const [spin, setSpin] = useState(false);

  useEffect(() => {
    setAnimationIndex(Math.floor(Math.random() * swordAnimations.length));
    setSpin(false); // reset spin
    setLoading(true);

    const spinTimer = setTimeout(() => setSpin(true), 1800); // spin after opening
    const loadingTimer = setTimeout(() => setLoading(false), 3000);

    return () => {
      clearTimeout(spinTimer);
      clearTimeout(loadingTimer);
    };
  }, [location]);

  const animation = swordAnimations[animationIndex];

  return (
    <>
      <AnimatePresence>
        {loading && (
          <motion.div
            key="sword-loader"
            className="fixed inset-0 bg-white z-50 flex items-center justify-center gap-10 overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              perspective: 1200,
            }}
          >
            <motion.img
              src="https://github.com/user-attachments/assets/7003af7e-646d-4cea-91af-2578ca2c0857"
              alt="Left Sword"
              className="h-40 md:h-60"
              initial={animation.left}
              animate={spin ? animation.spinLeft : animation.finalLeft}
              exit={animation.left}
              transition={spin ? animation.spinLeft.transition : { duration: 2.5, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            />
            <motion.img
              src="https://github.com/user-attachments/assets/7003af7e-646d-4cea-91af-2578ca2c0857"
              alt="Right Sword"
              className="h-40 md:h-60 -ml-10"
              initial={animation.right}
              animate={spin ? animation.spinRight : animation.finalRight}
              exit={animation.right}
              transition={spin ? animation.spinRight.transition : { duration: 2.5, ease: "easeInOut" }}
              style={{
                transformStyle: "preserve-3d",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar loading={loading} />
      <div
        className={`transition-opacity duration-700 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
      >
        <Outlet />
      </div>
    </>
  );
}
