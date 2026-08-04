import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Environment, Float, ContactShadows, Stars, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useInView } from 'framer-motion';

// 1. Sci-Fi Atom Model - Replaces Cyber Cube
function AtomModel({ color }) {
  const electron1 = useRef();
  const electron2 = useRef();
  const electron3 = useRef();
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
        group.current.rotation.y = t * 0.2;
        group.current.rotation.x = Math.sin(t * 0.5) * 0.2;
    }
    // Orbiting electrons
    if (electron1.current) {
        electron1.current.position.x = Math.cos(t * 2) * 1.5;
        electron1.current.position.y = Math.sin(t * 2) * 1.5;
    }
    if (electron2.current) {
        electron2.current.position.x = Math.cos(t * 2.5) * 1.5;
        electron2.current.position.z = Math.sin(t * 2.5) * 1.5;
    }
    if (electron3.current) {
        electron3.current.position.y = Math.cos(t * 3) * 1.5;
        electron3.current.position.z = Math.sin(t * 3) * 1.5;
    }
  });

  return (
    <group ref={group}>
      {/* Nucleus */}
      <mesh>
        <icosahedronGeometry args={[0.4, 2]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={3} wireframe />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
      </mesh>
      {/* Orbital Rings */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0.2} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0.2} transparent opacity={0.5} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[1.5, 0.02, 16, 100]} />
        <meshStandardMaterial color="#888888" metalness={1} roughness={0.2} transparent opacity={0.5} />
      </mesh>
      
      {/* Electrons */}
      <mesh ref={electron1}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh ref={electron2}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh ref={electron3}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>

      <pointLight color={color} intensity={3} distance={6} />
    </group>
  );
}

// 2. Sci-Fi Energy Crystal Cluster - Replaces Smartphone
function EnergyCrystal({ color }) {
  const group = useRef();
  
  useFrame((state) => {
    group.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    group.current.position.y = Math.sin(state.clock.getElapsedTime()) * 0.1 - 0.5;
  });

  return (
    <group ref={group}>
      {/* Main Crystal */}
      <mesh position={[0, 1, 0]}>
        <cylinderGeometry args={[0, 0.4, 2.5, 6]} />
        <meshPhysicalMaterial color={color} transmission={0.95} roughness={0.1} ior={1.6} thickness={1.5} clearcoat={1} />
      </mesh>
      {/* Side Crystal 1 */}
      <mesh position={[0.4, 0.6, 0.4]} rotation={[0.2, 0, -0.4]}>
        <cylinderGeometry args={[0, 0.3, 1.5, 6]} />
        <meshPhysicalMaterial color={color} transmission={0.9} roughness={0.15} ior={1.6} thickness={1} clearcoat={1} />
      </mesh>
      {/* Side Crystal 2 */}
      <mesh position={[-0.4, 0.8, -0.2]} rotation={[-0.3, 0, 0.4]}>
        <cylinderGeometry args={[0, 0.25, 1.8, 6]} />
        <meshPhysicalMaterial color="#ffffff" transmission={0.9} roughness={0.1} ior={1.6} thickness={1} clearcoat={1} />
      </mesh>
      {/* Inner Glow */}
      <pointLight color={color} intensity={3} position={[0, 0.5, 0]} distance={4} />
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

// 3. Low-Poly Asteroid / Exoplanet - Replaces Tablet
function LowPolyAsteroid({ color }) {
    const asteroidRef = useRef();
    
    useFrame((state) => {
      asteroidRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
      asteroidRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    });
  
    return (
      <group ref={asteroidRef}>
        <mesh castShadow receiveShadow>
          <icosahedronGeometry args={[1.4, 1]} />
          <meshStandardMaterial color="#d1562e" flatShading roughness={0.8} metalness={0.2} />
        </mesh>
        {/* Floating Rocks around it */}
        {[...Array(8)].map((_, i) => (
            <mesh key={i} position={[
                Math.cos(i) * 2,
                Math.sin(i * 2) * 1.5,
                Math.sin(i) * 2
            ]} rotation={[Math.random(), Math.random(), 0]}>
                <icosahedronGeometry args={[0.2, 0]} />
                <meshStandardMaterial color="#885544" flatShading roughness={0.9} />
            </mesh>
        ))}
      </group>
    );
}

// 4. Wormhole Portal - Replaces Monitor
function WormholePortal({ color }) {
    const portalRef = useRef();
    const particlesRef = useRef();

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (portalRef.current) portalRef.current.rotation.z = -t * 2;
        if (particlesRef.current) particlesRef.current.rotation.z = t * 1.5;
    });

    return (
        <group rotation={[0, Math.PI / 4, 0]}>
            {/* Portal Ring */}
            <mesh>
                <torusGeometry args={[1.5, 0.15, 32, 64]} />
                <meshStandardMaterial color="#333" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Energy Ring */}
            <mesh ref={portalRef}>
                <torusGeometry args={[1.3, 0.05, 16, 64]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
            </mesh>
            {/* Event Horizon (Inner Portal) */}
            <mesh>
                <circleGeometry args={[1.4, 64]} />
                <meshBasicMaterial color="#000000" />
            </mesh>
            {/* Swirling Galaxy / Particles inside portal */}
            <mesh ref={particlesRef} position={[0, 0, 0.01]}>
                <circleGeometry args={[1.3, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} blending={THREE.AdditiveBlending} wireframe />
            </mesh>
            <pointLight color={color} intensity={2} distance={6} />
        </group>
    );
}

// 5. Arc Reactor
function ArcReactor({ color }) {
  const group = useRef();
  const ring1 = useRef();
  const ring2 = useRef();
  const ring3 = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t / 2) * 0.5;
    group.current.rotation.x = Math.cos(t / 2) * 0.2;
    ring1.current.rotation.z = t;
    ring2.current.rotation.z = -t * 1.5;
    ring3.current.rotation.z = t * 2;
  });

  return (
    <group ref={group} dispose={null} scale={1.2}>
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial color="#ffffff" emissive={color} emissiveIntensity={3} />
      </mesh>
      <mesh>
        <torusGeometry args={[1.2, 0.15, 32, 64]} />
        <meshStandardMaterial color="#444" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[0.7, 0.05, 16, 64]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI/2, 0, 0]}>
        <torusGeometry args={[0.9, 0.03, 16, 64]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI/2, 0]}>
        <torusGeometry args={[1.05, 0.04, 16, 64]} />
        <meshStandardMaterial color="#aaa" metalness={1} roughness={0.1} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh key={i} position={[Math.cos((i * Math.PI) / 3) * 1.2, Math.sin((i * Math.PI) / 3) * 1.2, 0]} rotation={[0, 0, (i * Math.PI) / 3]}>
          <boxGeometry args={[0.4, 0.4, 0.4]} />
          <meshStandardMaterial color="#222" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      <pointLight color={color} intensity={2} distance={5} />
    </group>
  );
}

// 6. Realistic Planet Earth
function PlanetEarth() {
  const earthRef = useRef();
  const cloudsRef = useRef();
  const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg',
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_clouds_1024.png',
  ]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (earthRef.current) earthRef.current.rotation.y = t * 0.1;
    if (cloudsRef.current) cloudsRef.current.rotation.y = t * 0.12;
  });

  return (
    <group>
      <mesh ref={earthRef} castShadow receiveShadow>
        <sphereGeometry args={[1.5, 64, 64]} />
        <meshStandardMaterial map={colorMap} normalMap={normalMap} roughnessMap={specularMap} metalness={0.1} roughness={0.6} />
      </mesh>
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.52, 64, 64]} />
        <meshStandardMaterial map={cloudsMap} transparent opacity={0.4} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.6, 64, 64]} />
        <meshStandardMaterial color="#4b92db" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

// 7. Realistic Planet Moon
function PlanetMoon() {
  const moonRef = useRef();
  const [colorMap] = useLoader(THREE.TextureLoader, [
    'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/moon_1024.jpg'
  ]);
  useFrame((state) => {
    if (moonRef.current) moonRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
  });
  return (
    <mesh ref={moonRef} castShadow receiveShadow>
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial map={colorMap} metalness={0} roughness={0.8} bumpMap={colorMap} bumpScale={0.02} />
    </mesh>
  );
}

// 8. Planet Saturn
function PlanetSaturn() {
  const saturnRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    saturnRef.current.rotation.y = t * 0.05;
  });

  return (
    <group ref={saturnRef} rotation={[0.4, 0, -0.2]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshStandardMaterial color="#e3cfa1" roughness={0.6} />
        <mesh>
            <sphereGeometry args={[1.21, 64, 64]} />
            <meshStandardMaterial color="#d1b782" wireframe transparent opacity={0.1} />
        </mesh>
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]} receiveShadow castShadow>
        <ringGeometry args={[1.5, 2.0, 64]} />
        <meshStandardMaterial color="#c4b595" side={THREE.DoubleSide} transparent opacity={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.05, 2.4, 64]} />
        <meshStandardMaterial color="#d4c8ad" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.42, 2.7, 64]} />
        <meshStandardMaterial color="#e8deca" side={THREE.DoubleSide} transparent opacity={0.4} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.3, 1.48, 64]} />
        <meshStandardMaterial color="#a3967d" side={THREE.DoubleSide} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

// 9. Holographic Knot
function HolographicKnot({ color }) {
  const knotRef = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (knotRef.current) { knotRef.current.rotation.x = t * 0.4; knotRef.current.rotation.y = t * 0.5; }
  });
  return (
    <mesh ref={knotRef}>
      <torusKnotGeometry args={[1, 0.3, 128, 16]} />
      <meshPhysicalMaterial color={color} transmission={0.9} opacity={1} metalness={0.5} roughness={0.1} clearcoat={1} emissive={color} emissiveIntensity={0.2} />
    </mesh>
  );
}

function SciFiObject({ index }) {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { margin: "200px" });
  const colors = ["#00f0ff", "#b026ff", "#4dffb8", "#ffd700", "#ff3366"];
  const color = colors[index % colors.length];

  const renderModel = () => {
    const mod = index % 9;
    switch(mod) {
      case 0: return <AtomModel color={color} />; // Atom Model 
      case 1: return <EnergyCrystal color={color} />; // Glass Crystal Clusters
      case 2: return <LowPolyAsteroid />; // Mars/Asteroid vibe
      case 3: return <WormholePortal color={color} />; // Sci-Fi Portal
      case 4: return <ArcReactor color={color} />; 
      case 5: return <PlanetEarth />;
      case 6: return <PlanetMoon />;
      case 7: return <HolographicKnot color={color} />;
      case 8: return <PlanetSaturn />; 
      default: return <AtomModel color={color} />;
    }
  }

  return (
    <div ref={containerRef} style={{ width: '100%', height: '400px', cursor: 'grab' }}>
      <Canvas shadows camera={{ position: [0, 0, 5.5], fov: 45 }} frameloop={isInView ? "always" : "never"}>
        <ambientLight intensity={0.4} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} intensity={2} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        
        <Suspense fallback={<Html center><div style={{color: '#00f0ff', fontFamily: 'monospace'}}>Loading 3D...</div></Html>}>
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
             {renderModel()}
          </Float>
          <Environment preset="city" />
          <ContactShadows position={[0, -2.5, 0]} opacity={0.6} scale={10} blur={2.5} far={4} color="#000000" />
          <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        </Suspense>
        
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
}

export default SciFiObject;
