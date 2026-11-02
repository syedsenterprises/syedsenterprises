import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Projection() {
  const group = useRef();
  const portrait = useTexture('/founder-hologram.webp');
  portrait.colorSpace = THREE.SRGBColorSpace;
  useFrame((state, delta) => {
    if (!group.current) return;
    const { x, y } = state.pointer;
    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, x * .13, 2, delta);
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, -y * .07, 2, delta);
    group.current.position.y = Math.sin(state.clock.elapsedTime * .7) * .035;
  });
  return <group ref={group}>
    <Float speed={.7} rotationIntensity={.025} floatIntensity={.08}>
      <mesh position={[0, .45, .12]}>
        <planeGeometry args={[3.18, 3.48]} />
        <meshBasicMaterial map={portrait} transparent opacity={.98} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
      <mesh position={[0, .45, -.045]}><planeGeometry args={[3.28, 3.58]} /><meshBasicMaterial color="#13cfff" wireframe transparent opacity={.045} /></mesh>
      {[1.92, 2.12, 2.34].map((r, i) => <mesh key={r} rotation={[Math.PI / 2, 0, i * .22]} position={[0, -1.25 + i * .012, 0]}><torusGeometry args={[r, i === 1 ? .018 : .007, 8, 160]} /><meshBasicMaterial color={i === 1 ? '#62eaff' : '#198cce'} transparent opacity={i === 1 ? .95 : .55} /></mesh>)}
      <mesh position={[0, -1.29, 0]}><cylinderGeometry args={[1.35, 1.55, .07, 96]} /><meshStandardMaterial color="#06263d" metalness={.9} roughness={.22} emissive="#063d60" emissiveIntensity={1.2} /></mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -1.24, 0]}><torusGeometry args={[1.48, .035, 10, 128]} /><meshBasicMaterial color="#5ceaff" /></mesh>
    </Float>
    <Sparkles count={95} scale={[4.5, 5.2, 2.5]} size={2.2} speed={.28} color="#72eaff" opacity={.78} />
  </group>;
}
export default function FounderHologram() {
  return <div className="se-founder-hologram">
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7.4], fov: 36 }} gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}>
      <ambientLight intensity={1.4} /><pointLight position={[2, 3, 4]} color="#5deaff" intensity={12} /><Projection />
    </Canvas>
    <span className="se-holo-tag">LIVE PROJECTION / FOUNDER 001</span>
    <span className="se-holo-coords">3D SPATIAL DISPLAY / MOVE POINTER</span>
  </div>;
}
