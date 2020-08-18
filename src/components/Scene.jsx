import React, { useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from 'react-three-fiber';
import { PerspectiveCamera, OrbitControls } from 'drei';
import { create } from 'zustand';
import Effects from './Effects';
import Ring from './3d/Ring';
import Plane from './3d/Plane';
import {Suspense} from 'react';
import * as THREE from 'three';

const rotateMeshInXAndYAxis = mesh => {
  if(mesh) mesh.rotation.x = mesh.rotation.y += 0.01;
}

const Scene = () => {

  const initialState = {
    camera: {
      position: [0, 2, 10],
      rotation: [0, 0, 0]
    },
    ambientLight: {
      intensity: 0.8
    },
    spotLight: {
      position: [0, 15, 5],
      penumbra: 0.2,
      intensity: 0.8,
      castShadow: true,
      shadowMapSizeWidth: 4096,
      shadowMapSizeHeight: 4096
    },
    cubes: [
      {
        start: 1,
        end: 12,
        position: [-3, 2, 3],
        handleMesh: rotateMeshInXAndYAxis,
        receiveShadow: true,
        castShadow: true
      },
      {
        start: 1,
        end: 12,
        position: [-2, 2, 3],
        handleMesh: rotateMeshInXAndYAxis,
        receiveShadow: true,
        castShadow: true
      },
      {
        start: 3,
        end: 15,
        position: [-1, 2, 3],
        handleMesh: rotateMeshInXAndYAxis,
        receiveShadow: true,
        castShadow: true
      }
    ],
    plane: {
      position: [0, 0, 0]
    }
  }

  const [useStore] = create(() => initialState)

  const {camera, cubes, plane} = useStore(state => ({
    camera: state.camera,
    cubes: state.cubes,
    plane: state.plane
  }))

  const cameraRef = useRef();

  const [outlined, setOutlined] = useState([]);

  const [playCube1, setPlayCube1] = useState(false);
  const [playCube2, setPlayCube2] = useState(false);

  useFrame(({clock}) => {
      //shouldDisplay(cube2, clock) ? setPlayCube2(true): setPlayCube2(false);
    }
  );

  const addOutlined = (mesh) => setOutlined(old => [...old, mesh]);

  const shouldDisplay = (shape, clock) => {
    return clock && clock.elapsedTime > shape.start && clock.elapsedTime < shape.end;
  };

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault {...camera}/>
      <ambientLight {...initialState.ambientLight}/>
      <spotLight
        {...initialState.spotLight}
        shadow-mapSize-width={initialState.spotLight.shadowMapSizeWidth}
        shadow-mapSize-height={initialState.spotLight.shadowMapSizeWidth}
      />
      {cubes.map((cube) => <Ring {...cube} onLoad={addOutlined}/>)}
      <Plane {...plane} width={1000} height={1000} scale={[1, 1, 1]} rotation={[-Math.PI / 2, 0, 0]}/>
      <Suspense fallback={null}>
        <Effects outlined={outlined}/>
      </Suspense>
    </>
  );
};

export default Scene;
