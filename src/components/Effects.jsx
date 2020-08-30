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
        <DepthOfField focusDistance={0} focalLength={0.02} bokehScale={2} height={480} />
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.9} height={300} />
        <Noise opacity={0.2} />
        <Vignette eskil={false} offset={0.1} darkness={1.1} />
        <BrightnessContrast brightness={0.06} contrast={0.22}/>
        <Outline ref={outlineRef} blendFunction={BlendFunction.ALPHA} visibleEdgeColor={"black"}/>
      </EffectComposer>
    </Suspense>
  );
};

export default Effects;
