import { useEffect, useState } from "react";
import LaptopShell from "../components/ProjectDevices/LaptopShell";
import TabletShell from "../components/ProjectDevices/TabLetShell"; // Assuming you have a TabletShell component
import MobileShell from "../components/ProjectDevices/MobileShell"; // Correct import for MobileShell
import { projects } from "../components/ProjectDevices/ProjectData";

export default function Projects() {
  const [isClient, setIsClient] = useState(false);
  const [deviceType, setDeviceType] = useState(""); // State to store device type

  useEffect(() => {
    setIsClient(true);

    // Function to update device type based on screen width
    const updateDeviceType = () => {
      if (window.innerWidth >= 1366) {
        setDeviceType("laptop"); // Laptop view for larger devices
      } else if (window.innerWidth >= 768 && window.innerWidth < 1366) {
        setDeviceType("tablet"); // Tablet view for devices smaller than 1280px
      } else {
        setDeviceType("mobile"); // Mobile view for devices smaller than 795px
      }
    };

    updateDeviceType(); // Set initial device type
    window.addEventListener("resize", updateDeviceType); // Update on window resize

    return () => {
      window.removeEventListener("resize", updateDeviceType); // Clean up event listener
    };
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden bg-white dark:bg-zinc-900 flex flex-col items-center justify-center px-4">
      {/* Title */}
      <h2 className="text-4xl text-blue-500 dark:text-blue-400 absolute top-4 text-center z-30">
        ----Project's----
      </h2>

      {/* Switch Layouts Based on Screen Size */}
      {isClient && deviceType === "laptop" && (
        <div className="w-[100%] h-[100%] flex justify-center">
          <LaptopShell projects={projects} />
        </div>
      )}
      {isClient && deviceType === "tablet" && (
        <div className="w-[180%] h-[180%] flex justify-center">
          <TabletShell projects={projects} />
        </div>
      )}
      {isClient && deviceType === "mobile" && (
        <div className="w-full h-full flex justify-center">
          <MobileShell projects={projects} />
        </div>
      )}

    </div>
  );
}
