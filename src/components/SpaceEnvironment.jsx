import { useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
function DeepSpace() {
  const drift = useRef(); const nebula = useRef(); const { pointer, camera } = useThree();
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (drift.current) { drift.current.rotation.y = THREE.MathUtils.damp(drift.current.rotation.y, pointer.x * .035 + t * .002, 1.4, delta); drift.current.rotation.x = THREE.MathUtils.damp(drift.current.rotation.x, -pointer.y * .025, 1.4, delta); }
    if (nebula.current) { nebula.current.rotation.z += delta * .006; nebula.current.position.x = THREE.MathUtils.damp(nebula.current.position.x, pointer.x * -.18, 1.5, delta); }
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * .12, 1.3, delta); camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * .09, 1.3, delta); camera.lookAt(0,0,0);
  });
  return <>
    <color attach="background" args={['#030611']} /><fog attach="fog" args={['#030611', 18, 65]} />
    <ambientLight intensity={.22} /><pointLight position={[-8,4,2]} color="#1769b4" intensity={24} /><pointLight position={[8,-4,-8]} color="#7945bd" intensity={19} />
    <Stars radius={110} depth={75} count={6500} factor={4.2} saturation={.45} fade speed={.22} />
    <Sparkles count={280} scale={[34,22,28]} size={2} speed={.12} opacity={.55} color="#82dfff" />
    <group ref={drift}>
      <Float speed={.22} rotationIntensity={.025} floatIntensity={.08}>
        <mesh position={[7,2,-17]}><icosahedronGeometry args={[2.05,5]} /><MeshDistortMaterial color="#092e55" emissive="#092b54" emissiveIntensity={.8} roughness={.48} metalness={.55} distort={.16} speed={.25} /></mesh>
        <mesh position={[7,2,-17]} scale={1.025}><icosahedronGeometry args={[2.05,3]} /><meshBasicMaterial color="#62dfff" wireframe transparent opacity={.1} /></mesh>
        <mesh position={[7,2,-17]} rotation={[.7,.2,.4]}><torusGeometry args={[3.1,.018,8,180]} /><meshBasicMaterial color="#a47cff" transparent opacity={.5} /></mesh>
      </Float>
      <mesh position={[-8,-4,-24]}><sphereGeometry args={[4.5,48,48]} /><meshBasicMaterial color="#123c64" transparent opacity={.045} /></mesh>
    </group>
    <group ref={nebula} position={[-5,1,-22]}><mesh rotation={[.4,.2,.8]}><torusGeometry args={[5.5,.65,24,120]} /><meshBasicMaterial color="#153e72" transparent opacity={.045} side={THREE.DoubleSide} /></mesh></group>
  </>;
}
export default function SpaceEnvironment() { return <div className="se-space-environment" aria-hidden="true"><Canvas dpr={[1,1.35]} camera={{position:[0,0,9],fov:56}} gl={{antialias:false,alpha:false,powerPreference:'low-power'}}><DeepSpace /></Canvas><div className="se-space-vignette" /></div>; }
