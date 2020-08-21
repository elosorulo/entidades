import React from 'react';
import Effects from './Effects';
import {Suspense} from 'react';
import sceneFile from '../scene.json';
import EventDispatcherService from '../services/EventDispatcherService';
import SceneService from '../services/SceneService';
import { useEffect } from 'react';
import CameraProvider from './providers/CameraProvider';
import AmbientLightProvider from './providers/AmbientLightProvider';
import SpotLightsProvider from './providers/SpotLightsProvider';
import ShapesProvider from './providers/ShapesProvider';
import PlanesProvider from './providers/PlanesProvider';
import { useStore } from '../state/store';


const Scene = () => {


  return (
    <>
      <CameraProvider/>
      <AmbientLightProvider/>
      <SpotLightsProvider/>
      <ShapesProvider/>
      <PlanesProvider/>
      <Suspense fallback={null}>
        <Effects/>
      </Suspense>
    </>
  );
};

export default Scene;
