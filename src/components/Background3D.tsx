import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import * as THREE from "three";

const FloatingHeart = ({ position, scale, speed }: { position: [number, number, number]; scale: number; speed: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * speed * 0.5;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3;
    }
  });

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x, y + 0.25);
    shape.bezierCurveTo(x, y + 0.25, x - 0.25, y, x - 0.25, y);
    shape.bezierCurveTo(x - 0.55, y, x - 0.55, y + 0.35, x - 0.55, y + 0.35);
    shape.bezierCurveTo(x - 0.55, y + 0.55, x - 0.35, y + 0.75, x, y + 0.95);
    shape.bezierCurveTo(x + 0.35, y + 0.75, x + 0.55, y + 0.55, x + 0.55, y + 0.35);
    shape.bezierCurveTo(x + 0.55, y + 0.35, x + 0.55, y, x + 0.25, y);
    shape.bezierCurveTo(x + 0.1, y, x, y + 0.25, x, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.15,
    bevelEnabled: true,
    bevelSegments: 2,
    steps: 2,
    bevelSize: 0.05,
    bevelThickness: 0.05,
  }), []);

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale} rotation={[Math.PI, 0, 0]}>
        <extrudeGeometry args={[heartShape, extrudeSettings]} />
        <meshStandardMaterial
          color="#e11d48"
          emissive="#e11d48"
          emissiveIntensity={0.3}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>
    </Float>
  );
};

const GoldenStar = ({ position, scale }: { position: [number, number, number]; scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.5;
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      meshRef.current.scale.setScalar(scale * pulse);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={0.3}>
      <mesh ref={meshRef} position={position}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshStandardMaterial
          color="#d4af37"
          emissive="#d4af37"
          emissiveIntensity={0.8}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
};

const ParticleField = () => {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(200 * 3);
    const colors = new Float32Array(200 * 3);
    
    for (let i = 0; i < 200; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
      
      // Mix of rose gold, gold, and pink
      const colorChoice = Math.random();
      if (colorChoice < 0.33) {
        colors[i * 3] = 0.83; colors[i * 3 + 1] = 0.69; colors[i * 3 + 2] = 0.69; // Rose gold
      } else if (colorChoice < 0.66) {
        colors[i * 3] = 0.83; colors[i * 3 + 1] = 0.69; colors[i * 3 + 2] = 0.22; // Gold
      } else {
        colors[i * 3] = 0.88; colors[i * 3 + 1] = 0.44; colors[i * 3 + 2] = 0.63; // Pink
      }
    }
    
    return { positions, colors };
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const Scene = () => {
  const hearts = useMemo(() => [
    { position: [-3, 2, -3] as [number, number, number], scale: 0.3, speed: 0.8 },
    { position: [4, -1, -4] as [number, number, number], scale: 0.25, speed: 1.2 },
    { position: [-2, -2, -2] as [number, number, number], scale: 0.2, speed: 1 },
    { position: [3, 3, -5] as [number, number, number], scale: 0.35, speed: 0.6 },
    { position: [0, -3, -3] as [number, number, number], scale: 0.22, speed: 1.1 },
  ], []);

  const stars = useMemo(() => [
    { position: [-4, 1, -2] as [number, number, number], scale: 0.8 },
    { position: [5, 2, -3] as [number, number, number], scale: 0.6 },
    { position: [-1, 4, -4] as [number, number, number], scale: 0.7 },
    { position: [2, -2, -2] as [number, number, number], scale: 0.5 },
    { position: [-3, -3, -3] as [number, number, number], scale: 0.65 },
    { position: [4, -1, -5] as [number, number, number], scale: 0.55 },
  ], []);

  return (
    <>
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ffd700" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#e11d48" />
      
      <Stars
        radius={50}
        depth={50}
        count={1500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
      
      <ParticleField />
      
      {hearts.map((heart, i) => (
        <FloatingHeart key={i} {...heart} />
      ))}
      
      {stars.map((star, i) => (
        <GoldenStar key={i} {...star} />
      ))}
    </>
  );
};

const Background3D = () => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <Scene />
      </Canvas>
    </div>
  );
};

export default Background3D;
