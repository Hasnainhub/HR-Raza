'use client';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
  const ref = useRef<THREE.Points>(null!);
  
  // Create star particles
  const [points] = useState(() => {
    const p = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
        p[i * 3] = (Math.random() - 0.5) * 50;
        p[i * 3 + 1] = (Math.random() - 0.5) * 50;
        p[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return p;
  });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length / 3}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#00BFFF"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.4}
        depthWrite={false}
      />
    </points>
  );
};

const Background3D = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}>
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.5} />
        <Stars />
      </Canvas>
    </div>
  );
};

export default Background3D;
