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
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.05} />
        <Vignette eskil={false} offset={0.1} darkness={0.1} />
        <BrightnessContrast brightness={0.06} contrast={0.21}/>
        </EffectComposer>
    </Suspense>
  );
};

export default Effects;
