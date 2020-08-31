import React from 'react';
import Effects from './Effects';
import CameraProvider from './providers/CameraProvider';
import AmbientLightProvider from './providers/AmbientLightProvider';
import SpotLightsProvider from './providers/SpotLightsProvider';
import PlanesProvider from './providers/PlanesProvider';
import RingAnimations from './animations/RingsAnimations';
import Player from './Player';
import DodecahedronsAnimations from './animations/DodecahedronsAnimations';
import SpheresAnimations from './animations/SpheresAnimations';
import TetrahedronsAnimations from './animations/TetrahedronsAnimations';
import LathesAnimations from './animations/LathesAnimations';

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
      <Effects/>
      <Player soundsApi={props.soundsApi}/>
    </>
  );
};

export default Scene;
