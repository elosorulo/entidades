import React from 'react';
import {Suspense} from 'react';
import { BrightnessContrast, EffectComposer, DepthOfField, Bloom, Noise, Vignette, Outline } from 'react-postprocessing';
import { BlendFunction } from 'postprocessing';
import { useCallback } from 'react';
import { useFrame } from 'react-three-fiber';
import { useRef, useEffect } from 'react';
import { setAddOutlineAction, setRemoveOutlineAction } from '../state/actions';
import { storeApi, useStore } from '../state/store';
import { useState } from 'react';

const setFunctions = (ref, dispatch) => {
  dispatch(
    setAddOutlineAction(() => (mesh) => ref.current.selectObject(mesh))
  );
  dispatch(
    setRemoveOutlineAction(() => (mesh) => ref.current.deselectObject(mesh))
  );
}

const Effects = () => {

  const [callbacksSet, setCallbacksSet] = useState(false);

  const [dispatch] = useStore(state => [state.dispatch]);

  const outlineRef = useRef();

  useFrame(() => {
    if(!callbacksSet && outlineRef.current && dispatch) {
      setCallbacksSet(true);
      setFunctions(outlineRef, dispatch);
    }
  });
  
  return (
    <Suspense fallback={null}>
      <EffectComposer>
        <BrightnessContrast brightness={0.06} contrast={0.2}/>
        <DepthOfField focalLength={0.4} bokehScale={8} height={1080} target={[0, 0, 0]}/>
        <Noise opacity={0.05} />
        <Outline ref={outlineRef} blendFunction={BlendFunction.ALPHA} visibleEdgeColor={"black"}/>
        <Vignette eskil={false} offset={0.1} darkness={0.2} />
      </EffectComposer>
    </Suspense>
  );
};

export default Effects;
