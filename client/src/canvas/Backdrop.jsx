import React, { useRef } from 'react';
import { AccumulativeShadows, RandomizedLight } from '@react-three/drei';

const Backdrop = () => {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.85}
      scale={10}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
      ambientLightColor="#FBE0C3" // Set ambient light color to light orange
      shadowColor="#FBE0C3" // Set shadow color to light orange
    >
      {/* Background image */}
      <mesh>
        <planeBufferGeometry args={[20, 20]} />
        <meshBasicMaterial attach="material" transparent opacity={0.9}>
          <texture attach="map" url="/assets/ss.jpg" />
        </meshBasicMaterial>
      </mesh>

      <RandomizedLight 
        amount={4}
        radius={9}
        intensity={0.55}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight 
        amount={4}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
};

export default Backdrop;
