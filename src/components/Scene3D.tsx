import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  PresentationControls,
} from "@react-three/drei";
import * as THREE from "three";

/* ---------- Materials ---------- */
const CERAMIC = "#f3ede1";
const CERAMIC_IN = "#e6dccb";
const COFFEE = "#3a2418";
const CREMA = "#8a5a34";
const SAUCER = "#ece4d5";

/* Cup profile drawn as a lathe — gives a proper thrown-ceramic silhouette */
function useCupProfile() {
  return useMemo(() => {
    const pts: THREE.Vector2[] = [];
    // outer wall, bottom -> rim
    pts.push(new THREE.Vector2(0.0, 0.0));
    pts.push(new THREE.Vector2(0.42, 0.0));
    pts.push(new THREE.Vector2(0.46, 0.03));
    pts.push(new THREE.Vector2(0.5, 0.12));
    pts.push(new THREE.Vector2(0.58, 0.34));
    pts.push(new THREE.Vector2(0.66, 0.62));
    pts.push(new THREE.Vector2(0.7, 0.84));
    pts.push(new THREE.Vector2(0.705, 0.9));
    // rim roll
    pts.push(new THREE.Vector2(0.69, 0.915));
    // inner wall, rim -> bottom
    pts.push(new THREE.Vector2(0.655, 0.88));
    pts.push(new THREE.Vector2(0.61, 0.6));
    pts.push(new THREE.Vector2(0.53, 0.32));
    pts.push(new THREE.Vector2(0.45, 0.12));
    pts.push(new THREE.Vector2(0.0, 0.1));
    return pts;
  }, []);
}

function Steam({ x, delay }: { x: number; delay: number }) {
  const ref = useRef<THREE.Mesh>(null);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.34 + delay) % 1;
    if (ref.current) {
      ref.current.position.y = 0.95 + t * 1.15;
      ref.current.position.x = x + Math.sin(t * 6 + delay * 9) * 0.09;
      const s = 0.4 + t * 1.5;
      ref.current.scale.set(s, s, s);
    }
    if (mat.current) mat.current.opacity = Math.sin(t * Math.PI) * 0.16;
  });
  return (
    <mesh ref={ref} position={[x, 0.95, 0]}>
      <sphereGeometry args={[0.11, 12, 12]} />
      <meshBasicMaterial ref={mat} color="#ffffff" transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}

function Cup() {
  const profile = useCupProfile();
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current)
      group.current.rotation.y = clock.getElapsedTime() * 0.16;
  });

  return (
    <group ref={group} position={[0, -0.5, 0]}>
      {/* Saucer */}
      <mesh position={[0, -0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[1.25, 1.12, 0.075, 72]} />
        <meshStandardMaterial color={SAUCER} roughness={0.55} metalness={0.02} />
      </mesh>
      <mesh position={[0, 0.005, 0]} rotation={[Math.PI / 2, 0, 0]} receiveShadow>
        <torusGeometry args={[1.16, 0.045, 16, 72]} />
        <meshStandardMaterial color={CERAMIC_IN} roughness={0.6} />
      </mesh>

      {/* Cup body */}
      <mesh position={[0, 0.005, 0]} castShadow receiveShadow>
        <latheGeometry args={[profile, 84]} />
        <meshStandardMaterial
          color={CERAMIC}
          roughness={0.38}
          metalness={0.03}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Handle */}
      <mesh position={[0.72, 0.5, 0]} rotation={[0, 0, -0.28]} castShadow>
        <torusGeometry args={[0.3, 0.055, 20, 60, Math.PI * 1.35]} />
        <meshStandardMaterial color={CERAMIC} roughness={0.38} metalness={0.03} />
      </mesh>

      {/* Coffee surface with crema ring */}
      <mesh position={[0, 0.845, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.635, 64]} />
        <meshStandardMaterial color={COFFEE} roughness={0.22} metalness={0.16} />
      </mesh>
      <mesh position={[0, 0.848, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.44, 0.635, 64]} />
        <meshStandardMaterial color={CREMA} roughness={0.42} transparent opacity={0.85} />
      </mesh>
      {/* Latte-art rosette hint */}
      <mesh position={[0, 0.852, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.26, 48]} />
        <meshStandardMaterial color="#e8d8c0" roughness={0.5} transparent opacity={0.9} />
      </mesh>

      <Steam x={-0.16} delay={0} />
      <Steam x={0.12} delay={0.38} />
      <Steam x={0.0} delay={0.72} />
    </group>
  );
}

/** A small saucer-side bean for composition */
function Bean({ position, rot }: { position: [number, number, number]; rot: number }) {
  return (
    <mesh position={position} rotation={[0.4, rot, 0.2]} castShadow>
      <sphereGeometry args={[0.115, 20, 16]} />
      <meshStandardMaterial color="#4a2f1d" roughness={0.65} />
    </mesh>
  );
}

export default function Scene3D() {
  return (
    <div className="h-[22rem] w-full cursor-grab active:cursor-grabbing sm:h-[26rem] md:h-[32rem]">
      <Canvas
        shadows
        dpr={[1, 1.8]}
        camera={{ position: [0, 1.5, 5.2], fov: 38 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.65} />
          <directionalLight
            position={[3.5, 5.5, 3]}
            intensity={2.1}
            color="#fff3dd"
            castShadow
            shadow-mapSize={[1024, 1024]}
          />
          <directionalLight position={[-4, 2, -3]} intensity={0.55} color="#cfd6b8" />
          <spotLight
            position={[0, 6, 1]}
            angle={0.6}
            penumbra={1}
            intensity={1.2}
            color="#ffe9c9"
          />

          <PresentationControls
            global
            snap
            speed={1.1}
            zoom={0.9}
            rotation={[0.12, -0.35, 0]}
            polar={[-0.25, 0.5]}
            azimuth={[-0.9, 0.9]}
          >
            <Float speed={1.4} rotationIntensity={0.16} floatIntensity={0.42}>
              <Cup />
              <Bean position={[-1.5, -0.42, 0.55]} rot={0.6} />
              <Bean position={[1.42, -0.44, 0.7]} rot={-1.1} />
              <Bean position={[1.05, -0.43, -0.95]} rot={2.2} />
            </Float>
          </PresentationControls>

          <ContactShadows
            position={[0, -1.15, 0]}
            opacity={0.34}
            scale={9}
            blur={2.6}
            far={3}
            color="#20231a"
          />
          <Environment preset="sunset" />
        </Suspense>
      </Canvas>
    </div>
  );
}
