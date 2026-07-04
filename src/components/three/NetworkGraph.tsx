import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

/**
 * Six nodes standing in for the domains this person actually works across —
 * Backend sits at the hub because everything else in the brief (and the
 * hero copy) routes through it. Not a decorative blob; a small diagram.
 */
const NODES = [
  { id: "backend", position: new THREE.Vector3(0, 0, 0), size: 0.24, color: "#C9A24B", intensity: 1.5 },
  { id: "frontend", position: new THREE.Vector3(-2.1, 1.05, 0.3), size: 0.11, color: "#EDEFF1", intensity: 0.35 },
  { id: "ai", position: new THREE.Vector3(1.9, 1.3, -0.5), size: 0.13, color: "#5FD9C4", intensity: 0.6 },
  { id: "cloud", position: new THREE.Vector3(1.7, -1.2, 0.5), size: 0.11, color: "#5FD9C4", intensity: 0.5 },
  { id: "iot", position: new THREE.Vector3(-1.8, -0.95, -0.4), size: 0.11, color: "#EDEFF1", intensity: 0.35 },
  { id: "devops", position: new THREE.Vector3(-0.2, 1.8, -0.7), size: 0.1, color: "#8B93A0", intensity: 0.3 },
];

const EDGES: Array<[number, number]> = [
  [0, 1],
  [0, 2],
  [0, 3],
  [0, 4],
  [0, 5],
  [2, 3],
  [4, 5],
];

function Pulse({ from, to, offset, duration }: { from: THREE.Vector3; to: THREE.Vector3; offset: number; duration: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    if (!ref.current || !materialRef.current) return;
    const t = ((clock.elapsedTime + offset) % duration) / duration;
    ref.current.position.lerpVectors(from, to, t);
    materialRef.current.opacity = Math.sin(t * Math.PI) * 0.9;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.035, 8, 8]} />
      <meshBasicMaterial ref={materialRef} color="#5FD9C4" transparent opacity={0} />
    </mesh>
  );
}

export function NetworkGraph() {
  const groupRef = useRef<THREE.Group>(null);
  const autoAngle = useRef(0);
  const pointerLerp = useRef({ x: 0, y: 0 });
  const { pointer } = useThree();

  useFrame((_, delta) => {
    autoAngle.current += delta * 0.045;
    pointerLerp.current.x += (pointer.x - pointerLerp.current.x) * 0.02;
    pointerLerp.current.y += (pointer.y - pointerLerp.current.y) * 0.02;
    if (groupRef.current) {
      groupRef.current.rotation.y = autoAngle.current + pointerLerp.current.x * 0.3;
      groupRef.current.rotation.x = pointerLerp.current.y * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.5} />
      <pointLight position={[4, 3, 4]} intensity={22} color="#C9A24B" />
      <pointLight position={[-4, -2, -3]} intensity={14} color="#5FD9C4" />

      {EDGES.map(([a, b], i) => (
        <Line
          key={`edge-${i}`}
          points={[NODES[a].position, NODES[b].position]}
          color={i < 5 ? "#C9A24B" : "#5FD9C4"}
          transparent
          opacity={0.22}
          lineWidth={1}
        />
      ))}

      {EDGES.map(([a, b], i) => (
        <Pulse
          key={`pulse-${i}`}
          from={NODES[a].position}
          to={NODES[b].position}
          offset={i * 1.35}
          duration={4 + (i % 3)}
        />
      ))}

      {NODES.map((n) => (
        <mesh key={n.id} position={n.position}>
          <icosahedronGeometry args={[n.size, 1]} />
          <meshStandardMaterial
            color={n.color}
            emissive={n.color}
            emissiveIntensity={n.intensity}
            roughness={0.35}
            metalness={0.5}
          />
        </mesh>
      ))}
    </group>
  );
}
