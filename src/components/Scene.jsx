import React from 'react';
import Effects from './Effects';
import CameraProvider from './providers/CameraProvider';
import AmbientLightProvider from './providers/AmbientLightProvider';
import SpotLightsProvider from './providers/SpotLightsProvider';
import PlanesProvider from './providers/PlanesProvider';
import RingAnimations from './animations/RingsAnimations';
import Sequencer from './Sequencer';
import DodecahedronsAnimations from './animations/DodecahedronsAnimations';
import SpheresAnimations from './animations/SpheresAnimations';
import TetrahedronsAnimations from './animations/TetrahedronsAnimations';
import LathesAnimations from './animations/LathesAnimations';
import Panels from './shapes/Panels';
import { OrbitControls } from 'drei';

const Scene = (props) => {
  return (
    <>
      <CameraProvider/>
      <AmbientLightProvider/>
      <SpotLightsProvider/>
      <PlanesProvider/>
      <RingAnimations/>
      <DodecahedronsAnimations/>
      <SpheresAnimations/>
      <TetrahedronsAnimations/>
      <LathesAnimations/>
      <Panels/>
      <Effects/>
      <Sequencer soundsApi={props.soundsApi}/>
    </>
  );
};

export default Scene;
