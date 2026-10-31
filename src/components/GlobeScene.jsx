import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls, Stars } from '@react-three/drei';

function GlobeModel() {
  const group = useRef();

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.075;
  });

  return (
    <group ref={group}>
      <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.18}>
        <mesh><sphereGeometry args={[1.35, 64, 64]} /><meshStandardMaterial color="#062d4a" metalness={0.7} roughness={0.3} emissive="#063b68" emissiveIntensity={0.7} /></mesh>
        <mesh><sphereGeometry args={[1.37, 36, 36]} /><meshBasicMaterial color="#29dfff" wireframe transparent opacity={0.19} /></mesh>
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}><torusGeometry args={[1.63, 0.012, 8, 160]} /><meshBasicMaterial color="#20dfff" /></mesh>
        <mesh rotation={[Math.PI / 2.3, 0.2, 0]}><torusGeometry args={[1.78, 0.006, 8, 160]} /><meshBasicMaterial color="#a04bff" /></mesh>
        <mesh rotation={[0.7, 0, 0.8]}><torusGeometry args={[1.5, 0.008, 8, 160]} /><meshBasicMaterial color="#28ffc6" /></mesh>
      </Float>
    </group>
  );
}

export default function GlobeScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5.7], fov: 42 }} dpr={[1, 1.6]} gl={{ alpha: true, antialias: true }}>
      <ambientLight intensity={1.2} />
      <pointLight position={[4, 3, 4]} intensity={3} color="#31dfff" />
      <pointLight position={[-4, -2, 2]} intensity={2} color="#7c45ff" />
      <Stars radius={70} depth={35} count={900} factor={3} saturation={0.5} fade speed={0.5} />
      <GlobeModel />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.35} />
    </Canvas>
  );
}
