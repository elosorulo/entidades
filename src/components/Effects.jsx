import React from 'react';
import {Suspense} from 'react';
import { BrightnessContrast, EffectComposer, DepthOfField, Bloom, Noise, Vignette, Outline } from 'react-postprocessing';
import { BlendFunction } from 'postprocessing';
import { useCallback } from 'react';

const Effects = (props) => {
  const outlineRef = useCallback((outline) => {
    if(outline !== null) outline.selection.set(props.outlined);
  }, [props.outlined]);

  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <BrightnessContrast brightness={0.15} contrast={0.4}/>
        <DepthOfField focalLength={0.01} bokehScale={8} height={1080} target={[0, 0, 0]}/>
        <Bloom luminanceThreshold={0} luminanceSmoothing={0.4} height={500} />
        <Noise opacity={0.1} />
        <Outline ref={outlineRef} blendFunction={BlendFunction.ALPHA} visibleEdgeColor={"black"}/>
        <Vignette eskil={false} offset={0.1} darkness={0.8} />
      </EffectComposer>
    </Suspense>
  );
};

export default Effects;
