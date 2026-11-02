import { Component, useEffect, useRef, useState } from 'react';
import { Globe2 } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sparkles, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function SceneFallback({ message = 'Interactive world preview unavailable' }) {
  return <div className="se-scene-fallback" role="img" aria-label={message}><Globe2 /><span>{message}</span><small>The content remains available without WebGL.</small></div>;
}
class SceneErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <SceneFallback /> : this.props.children; }
}
function World({ compact, venture }) {
  const themes = { cyan: { core: '#07518e', glow: '#063d70', orbit: '#8eeaff', accent: '#b18aff', secondary: '#e5bc52' }, gold: { core: '#76511b', glow: '#5b3b12', orbit: '#f3cf76', accent: '#8eeaff', secondary: '#d99b42' }, mint: { core: '#075b50', glow: '#06483f', orbit: '#73e8b0', accent: '#6de7ff', secondary: '#b6f4dc' }, violet: { core: '#453078', glow: '#2d2058', orbit: '#b99aff', accent: '#6de7ff', secondary: '#e0c7ff' }, blue: { core: '#174d9b', glow: '#10356d', orbit: '#77aaff', accent: '#6de7ff', secondary: '#b7d4ff' } };
  const theme = themes[venture?.color] || themes.cyan;
  const root = useRef();
  const core = useRef();
  const { pointer, camera } = useThree();
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (root.current) {
      root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.x * .22 + Math.sin(t * .12) * .08, 2.2, delta);
      root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, -pointer.y * .16 + Math.cos(t * .1) * .035, 2.2, delta);
      root.current.position.y = Math.sin(t * .35) * .045;
    }
    if (core.current) core.current.rotation.y += delta * .035;
    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * .16, 2, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, pointer.y * .12, 2, delta);
    camera.lookAt(0, 0, 0);
  });
  const scale = compact ? .76 : 1;
  return <>
    <ambientLight intensity={.7} />
    <pointLight position={[3, 4, 5]} color="#b8efff" intensity={18} />
    <pointLight position={[-4, -2, 2]} color="#875cff" intensity={12} />
    <pointLight position={[0, 1, -4]} color="#1678d8" intensity={9} />
    <group ref={root} scale={scale}>
      <Float speed={.55} rotationIntensity={.07} floatIntensity={.12}>
        <group ref={core}>
          <mesh><icosahedronGeometry args={[1.12, 5]} /><MeshDistortMaterial color={theme.core} emissive={theme.glow} emissiveIntensity={.85} metalness={.65} roughness={.28} distort={.13} speed={.5} /></mesh>
          <mesh scale={1.012}><icosahedronGeometry args={[1.12, 3]} /><meshBasicMaterial color="#9deaff" wireframe transparent opacity={.24} /></mesh>
          <mesh scale={1.045}><icosahedronGeometry args={[1.12, 2]} /><meshBasicMaterial color="#52cfff" wireframe transparent opacity={.12} /></mesh>
        </group>
        <mesh rotation={[.45, .15, .28]}><torusGeometry args={[1.56, .012, 8, 180]} /><meshBasicMaterial color={theme.orbit} /></mesh>
        <mesh rotation={[1.12, .4, -.35]}><torusGeometry args={[1.82, .009, 8, 180]} /><meshBasicMaterial color={theme.accent} /></mesh>
        <mesh rotation={[.2, .8, .1]}><torusGeometry args={[2.05, .006, 8, 180]} /><meshBasicMaterial color={theme.secondary} transparent opacity={.75} /></mesh>
      </Float>
      {Array.from({ length: 9 }, (_, i) => {
        const a = i * Math.PI * 2 / 9;
        return <group key={i} position={[Math.cos(a) * 2.1, Math.sin(a * 1.7) * .7, Math.sin(a) * 1.6]}><mesh><sphereGeometry args={[.045 + (i % 3) * .012, 16, 16]} /><meshStandardMaterial color={i % 2 ? theme.accent : theme.orbit} emissive={i % 2 ? theme.accent : theme.orbit} emissiveIntensity={2.5} /></mesh><mesh scale={2.8}><sphereGeometry args={[.045 + (i % 3) * .012, 12, 12]} /><meshBasicMaterial color="#75e7ff" transparent opacity={.12} /></mesh></group>;
      })}
    </group>
    <Sparkles count={compact ? 70 : 120} scale={[7, 5, 5]} size={2} speed={.16} color="#9deaff" opacity={.72} />
  </>;
}
export default function WorldScene({ compact = false, venture }) {
  const [lost, setLost] = useState(false);
  const host = useRef(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const canvas = el.querySelector('canvas');
    if (!canvas) return;
    const onLost = e => { e.preventDefault(); setLost(true); };
    const onRestored = () => setLost(false);
    canvas.addEventListener('webglcontextlost', onLost);
    canvas.addEventListener('webglcontextrestored', onRestored);
    return () => { canvas.removeEventListener('webglcontextlost', onLost); canvas.removeEventListener('webglcontextrestored', onRestored); };
  }, []);
  return <div ref={host} className={`se-world-scene ${compact ? 'is-compact' : ''}`}>
    <SceneErrorBoundary><Canvas key={`${venture?.name || 'overview'}-${compact ? 'compact' : 'hero'}`} dpr={[1, 1.5]} camera={{ position: [0, 0, compact ? 6.7 : 5.8], fov: 38 }} gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}><World compact={compact} venture={venture} /></Canvas></SceneErrorBoundary>
    {lost && <SceneFallback message="3D scene paused after a graphics reset" />}
    <span className="se-scene-label">{venture ? `${venture.name.toUpperCase()} / SPATIAL WORLD` : 'CONNECTED WORLD / 001'}</span>
    <span className="se-scene-coordinate">{venture ? `${venture.category.toUpperCase()} · LIVE 3D` : 'LIVE SPATIAL SYSTEM · POINTER TRACKING'}</span>
  </div>;
}
