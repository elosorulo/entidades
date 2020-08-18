import React, { useRef } from 'react';
import { planeColor } from './material/color';
import gradientMap from './material/gradientMap';

const Plane = props => {

    const mesh = useRef();
  
    return (
      <group>

        <mesh
          {...props}
          ref={mesh}
          scale={props.scale ? props.scale : [1, 1, 1]}
          position={props.position ? props.position : [0, 0, 0]}
          rotation={props.rotation ? props.rotation : [0, 0, 0]}
        >
          <planeGeometry attach="geometry" args={[props.width? props.width : 10, props.height? props.height : 10]}/>
          <meshToonMaterial attach="material" color={planeColor} gradientMap={gradientMap(8)}/>
        </mesh>
        <mesh
          {...props}
          ref={mesh}
          scale={props.scale ? props.scale : [1, 1, 1]}
          position={props.position ? props.position : [0, 0, 0]}
          rotation={props.rotation ? props.rotation : [0, 0, 0]}
          receiveShadow
        >
          <planeGeometry attach="geometry" args={[props.width? props.width : 10, props.height? props.height : 10]}/>
          <shadowMaterial attach="material" color="#black" opacity={0.5} />
        </mesh>
      </group>
    );
  
  };

  export default Plane;
