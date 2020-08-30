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
import PlanesProvider from './providers/PlanesProvider';
import { useStore } from '../state/store';
import Rings from './shapes/Rings';
import CustomEffects from './CustomEffects';
import Player from './Player';
import Panels from './shapes/Panels';
import { OrbitControls} from 'drei';

const Scene = (props) => {
  
  return (
    <>
      <CameraProvider/>
      <AmbientLightProvider/>
      <SpotLightsProvider/>
      <PlanesProvider/>
      <Rings/>
      <Effects/>
      <Player soundsApi={props.soundsApi}/>
    </>
  );
};

export default Scene;
