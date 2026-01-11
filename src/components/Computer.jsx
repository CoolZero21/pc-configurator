import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Model } from "./PC";
import { Suspense } from "react";
import Loading from "./Loading";
import PopupSpecs from "./PopupSpecs";

const Computer = ({ started }) => {
  return (
    <div className="canvas-container">
      <Suspense fallback={<Loading />}>
        <Canvas camera={{ position: [-6, 0, 5], fov: 75 }} gl={{ preserveDrawingBuffer: true }}>
          <ambientLight intensity={1} />
          <directionalLight />
          <Environment files={"env.jpg"} />
          <Model position={[-8.538, 0.392, -0.798]} rotation={[0, 0, 0]} started={started} />
          <OrbitControls
            enableDamping
            dampingFactor={0.05}
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 2}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-2.2}
            maxAzimuthAngle={0.2}
          />
          <PopupSpecs position={[-0.5, 3, 3]} name={"Processor"} compKey={"cpu"} />
          <PopupSpecs position={[0, -3, 1]} name={"Power Supply"} compKey={"psu"} />
          <PopupSpecs position={[-0.8, -1.5, -4]} name={"Graphic Card"} compKey={"gpu"} />
          <PopupSpecs position={[0, 2.6, -4.2]} name={"Motherboard"} compKey={"mobo"} />
          <PopupSpecs position={[0, -0.5, 3.5]} name={"Memory"} compKey={"ram"} />
        </Canvas>
      </Suspense>
    </div>
  );
};
export default Computer;
