import React from 'react';
import {Suspense} from 'react';
import { BrightnessContrast, EffectComposer, DepthOfField, Bloom, Noise, Vignette, Outline } from 'react-postprocessing';
import { BlendFunction, OverrideMaterialManager } from 'postprocessing';
import { useRef, useEffect } from 'react';
import { storeApi } from '../state/store';
import { useFrame } from 'react-three-fiber';

const Effects = () => {

  const outlineRef = useRef();
  
  useEffect(() => {

    OverrideMaterialManager.workaroundEnabled = true;
  }, []);

  useFrame(() => {
    if(outlineRef.current) {
      outlineRef.current.selection.set(Object.values(storeApi.getState().outline));
    }
  });
  
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <Bloom luminanceThreshold={0.1} luminanceSmoothing={0.3} height={1200} intensity={1}/>
        <BrightnessContrast brightness={0.06} contrast={0.2}/>
        <DepthOfField focalLength={10} bokehScale={120} height={10} target={[0, 0, 0]}/>
        <Outline ref={outlineRef} blendFunction={BlendFunction.ALPHA} visibleEdgeColor={"black"}/>
        <Vignette eskil={false} offset={0.1} darkness={0.2} />
      </EffectComposer>
    </Suspense>
  );
};

export default Effects;
