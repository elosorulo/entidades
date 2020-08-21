import React, { useRef } from 'react';
import { planeColor } from '../material/color';
import gradientMap from '../material/gradientMap';

const Plane = props => {

    const mesh = useRef();
    return (
      <group>

        <mesh
          {...props}
          ref={mesh}
          scale={props.scale ? props.scale : [1, 1, 1]}
          position={props.position ? props.position : [0, 0, 0]}
          rotation={props.rotation ? props.rotation.map(n => Math.PI * n) : [0, 0, 0]}
        >
          <planeGeometry attach="geometry" args={[props.width, props.height]}/>
          <meshToonMaterial attach="material" color={props.color} gradientMap={gradientMap(8)}/>
        </mesh>
        <mesh
          {...props}
          ref={mesh}
          scale={props.scale ? props.scale : [1, 1, 1]}
          position={props.position ? props.position : [0, 0, 0]}
          rotation={props.rotation ? props.rotation.map(n => Math.PI * n) : [0, 0, 0]}
          receiveShadow
        >
          <planeGeometry attach="geometry" args={[props.width, props.height]}/>
          <shadowMaterial attach="material" color="#black" opacity={0.5} />
        </mesh>
      </group>
    );
  
  };

  export default Plane;
