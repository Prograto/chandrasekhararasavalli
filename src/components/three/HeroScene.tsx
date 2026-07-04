import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { NetworkGraph } from "./NetworkGraph";
import { StaticNetworkGraph } from "./StaticNetworkGraph";
import { CanvasErrorBoundary } from "./CanvasErrorBoundary";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/** Simple plane silhouette as a Float-ing 3D shape */
function PlaneSilhouette() {
  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <group position={[3.5, -1.5, -2]} rotation={[0, -0.4, 0.1]} scale={0.5}>
        {/* Fuselage */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.06, 2.2, 8]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.3} transparent opacity={0.25} />
        </mesh>
        {/* Wings */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.02, 1.8, 0.4]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.2} transparent opacity={0.2} />
        </mesh>
        {/* Tail */}
        <mesh position={[0, 1, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[0.02, 0.6, 0.2]} />
          <meshStandardMaterial color="#00f5ff" emissive="#00f5ff" emissiveIntensity={0.2} transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

export function HeroScene() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return <StaticNetworkGraph />;
  }

  return (
    <CanvasErrorBoundary fallback={<StaticNetworkGraph />}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Deep space stars — slow rotation, depth layers */}
          <Stars radius={80} depth={60} count={2500} factor={4} saturation={0} fade speed={0.4} />
          <Stars radius={40} depth={30} count={1000} factor={2} saturation={0.2} fade speed={0.2} />

          <NetworkGraph />
          <PlaneSilhouette />
        </Suspense>
      </Canvas>
    </CanvasErrorBoundary>
  );
}
