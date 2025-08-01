import  { useEffect, useRef } from "react";
import * as THREE from "three";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Avatar(props) {
  const { nodes, materials } = useGLTF("modal/Ashmeet.glb");
  const group = useRef();
  const { animations: Hands } = useFBX("animations/Greet.fbx");
  const { animations: netural } = useFBX("animations/netural.fbx");

  Hands[0].name = "Hands";
  netural[0].name = "netural";

  const { actions, mixer } = useAnimations([...Hands, ...netural], group);

  const target = useRef(new THREE.Vector3(0, 1, 1)); // Initial target position
  const currentPosition = useRef(new THREE.Vector3(0, 1, 1)); // Current interpolated position

  const stopped = useRef(false); // Use ref to store the stopped state

  useFrame((state) => {
    if (stopped.current) {
      const mouseX = state.mouse.x / 8; // Adjust intensity of movement
      
      target.current.set(mouseX, 1, 1);
      currentPosition.current.lerp(target.current, 0.05); // Smooth interpolation

      group.current.getObjectByName("Spine").lookAt(currentPosition.current);
    }
  });

  useEffect(() => {
    const HandsAction = actions["Hands"];
    const neturalAction = actions["netural"];

    HandsAction.setLoop(THREE.LoopOnce);
    HandsAction.clampWhenFinished = true;
    HandsAction.reset().fadeIn(0.3).play();

    mixer.addEventListener("finished", (e) => {
      if (e.action === HandsAction) {
        stopped.current = true; // Update ref instead of state
        neturalAction.setLoop(THREE.LoopRepeat);
        neturalAction.reset().fadeIn(0.5).play();
      }
    });

    // Cleanup event listener on component unmount
    return () => {
      mixer.removeEventListener("finished", () => {});
    };
  }, [actions, mixer]);

  return (
    <group {...props} dispose={null} ref={group}>
      <group rotation-x={-Math.PI / 2}>
        <primitive object={nodes.Hips} />
        <skinnedMesh
          geometry={nodes.Wolf3D_Hair.geometry}
          material={materials.Wolf3D_Hair}
          skeleton={nodes.Wolf3D_Hair.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Body.geometry}
          material={materials.Wolf3D_Body}
          skeleton={nodes.Wolf3D_Body.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
          material={materials.Wolf3D_Outfit_Bottom}
          skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
          material={materials.Wolf3D_Outfit_Footwear}
          skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
        />
        <skinnedMesh
          geometry={nodes.Wolf3D_Outfit_Top.geometry}
          material={materials.Wolf3D_Outfit_Top}
          skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
        />
        <skinnedMesh
          name="EyeLeft"
          geometry={nodes.EyeLeft.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeLeft.skeleton}
          morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
        />
        <skinnedMesh
          name="EyeRight"
          geometry={nodes.EyeRight.geometry}
          material={materials.Wolf3D_Eye}
          skeleton={nodes.EyeRight.skeleton}
          morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
          morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Head"
          geometry={nodes.Wolf3D_Head.geometry}
          material={materials.Wolf3D_Skin}
          skeleton={nodes.Wolf3D_Head.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
        />
        <skinnedMesh
          name="Wolf3D_Teeth"
          geometry={nodes.Wolf3D_Teeth.geometry}
          material={materials.Wolf3D_Teeth}
          skeleton={nodes.Wolf3D_Teeth.skeleton}
          morphTargetDictionary={nodes.Wolf3D_Teeth.morphTargetDictionary}
          morphTargetInfluences={nodes.Wolf3D_Teeth.morphTargetInfluences}
        />
      </group>
    </group>
  );
}

useGLTF.preload("modal/Ashmeet.glb");
export default Avatar;
