import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingParticles = ({ count = 200, scrollProgress = 0 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
      ] as [number, number, number],
      speed: Math.random() * 0.5 + 0.1,
      offset: Math.random() * Math.PI * 2,
      scale: Math.random() * 0.08 + 0.02,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const time = clock.getElapsedTime();

    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(time * p.speed + p.offset) * 2,
        p.position[1] + Math.cos(time * p.speed * 0.7 + p.offset) * 2 - scrollProgress * 20,
        p.position[2] + Math.sin(time * p.speed * 0.5) * 1
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(time * 2 + p.offset) * 0.3));
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#3B82F6" transparent opacity={0.6} />
    </instancedMesh>
  );
};

const FloatingGeometry = ({ scrollProgress = 0 }) => {
  const torusRef = useRef<THREE.Mesh>(null);
  const icosaRef = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (torusRef.current) {
      torusRef.current.rotation.x = t * 0.3;
      torusRef.current.rotation.y = t * 0.2;
      torusRef.current.position.y = Math.sin(t * 0.5) * 2 - scrollProgress * 15;
    }
    if (icosaRef.current) {
      icosaRef.current.rotation.x = t * 0.2;
      icosaRef.current.rotation.z = t * 0.3;
      icosaRef.current.position.y = Math.cos(t * 0.4) * 1.5 - scrollProgress * 12;
    }
    if (octaRef.current) {
      octaRef.current.rotation.y = t * 0.4;
      octaRef.current.rotation.z = t * 0.2;
      octaRef.current.position.y = Math.sin(t * 0.6 + 1) * 2 - scrollProgress * 18;
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
        <mesh ref={torusRef} position={[-8, 3, -5]}>
          <torusGeometry args={[2, 0.5, 16, 50]} />
          <meshStandardMaterial
            color="#6366F1"
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      </Float>

      <Float speed={2} rotationIntensity={0.8} floatIntensity={1.5}>
        <mesh ref={icosaRef} position={[9, -2, -8]}>
          <icosahedronGeometry args={[2.5, 1]} />
          <meshStandardMaterial
            color="#06B6D4"
            wireframe
            transparent
            opacity={0.12}
          />
        </mesh>
      </Float>

      <Float speed={1.2} rotationIntensity={0.6} floatIntensity={1.8}>
        <mesh ref={octaRef} position={[5, 5, -10]}>
          <octahedronGeometry args={[2, 0]} />
          <meshStandardMaterial
            color="#8B5CF6"
            wireframe
            transparent
            opacity={0.1}
          />
        </mesh>
      </Float>
    </>
  );
};

const GridPlane = ({ scrollProgress = 0 }) => {
  const ref = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.x = -Math.PI / 2 + 0.1;
      ref.current.position.y = -8 - scrollProgress * 5;
      (ref.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const gridShader = useMemo(() => ({
    uniforms: {
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#3B82F6') },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float uTime;
      uniform vec3 uColor;
      varying vec2 vUv;
      void main() {
        vec2 grid = abs(fract(vUv * 30.0 - 0.5) - 0.5) / fwidth(vUv * 30.0);
        float line = min(grid.x, grid.y);
        float alpha = 1.0 - min(line, 1.0);
        alpha *= 0.08;
        alpha *= smoothstep(1.0, 0.3, length(vUv - 0.5) * 1.5);
        float pulse = sin(uTime * 0.5 + length(vUv - 0.5) * 10.0) * 0.5 + 0.5;
        alpha *= 0.5 + pulse * 0.5;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  }), []);

  return (
    <mesh ref={ref} position={[0, -8, 0]}>
      <planeGeometry args={[100, 100, 1, 1]} />
      <shaderMaterial
        {...gridShader}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
};

interface Scene3DProps {
  scrollProgress: number;
}

export const Scene3D: React.FC<Scene3DProps> = ({ scrollProgress }) => {
  return (
    <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#3B82F6" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8B5CF6" />

        <Stars
          radius={50}
          depth={50}
          count={2000}
          factor={3}
          saturation={0.5}
          fade
          speed={0.5}
        />

        <FloatingParticles count={150} scrollProgress={scrollProgress} />
        <FloatingGeometry scrollProgress={scrollProgress} />
        <GridPlane scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
};
