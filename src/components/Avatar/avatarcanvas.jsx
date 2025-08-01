import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { PulseLoader } from "react-spinners";
const Avatar = React.lazy(() => import("./avatar"));

const AvatarCanvas = () => {
  return (
    <div className="relative z-10 w-full sm:w-[100%] h-[300px] sm:h-[100vh]">
      <Canvas shadows>
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 9, 5]} intensity={6} />
        <Suspense
          fallback={
            <Html center>
              <div className="text-white font-bold flex items-center gap-2">
                Loading <PulseLoader color="#fff" size={8} />
              </div>
            </Html>
          }
        >
          <group position-y={-1} rotation={[Math.PI / 11, 0, 0]}>
            <Avatar scale={[3.3, 2, 3]} />
          </group>
        </Suspense>
      </Canvas>
    </div>
  );
};

export default React.memo(AvatarCanvas);
