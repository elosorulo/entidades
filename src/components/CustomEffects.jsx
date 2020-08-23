import React from 'react';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { extend, useThree, useFrame } from 'react-three-fiber';
import { useMemo, useRef, useEffect } from 'react';
import { Vector2 } from 'three';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass';
import { DepthOfFieldEffect, OverrideMaterialManager } from 'postprocessing';

extend({ EffectComposer, RenderPass, AfterimagePass, UnrealBloomPass, ShaderPass, FilmPass,  BokehPass, DepthOfFieldEffect});
const CustomEffects = () => {
    const composer = useRef()
    const anotherComposer = useRef();
    const { scene, gl, size, camera } = useThree();
    const aspect = useMemo(() => new Vector2(size.width, size.height), [size]);
    
    
    useEffect(() =>  {
      composer.current.setSize(size.width, size.height)
    }, [size]
    )
    useFrame(() => {
    if(composer)composer.current.render();
    }, 1);

    const bokehParams = {
        focus: 1,
        aspect: aspect,
        aperture: 10,
        maxblur: 10,
        width: aspect.width,
        height: aspect.height
    }

    console.log(aspect);
    return (
      <>
      <effectComposer ref={composer} args={[gl]}>
        <renderPass attachArray="passes" scene={scene} camera={camera} />
        <depthOfFieldEffect focalLength={0.01} bokehScale={8} height={1080} target={[0, 0, 0]}/>
        <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
        <filmPass attachArray="passes" args={[
                0.35,  /*noise intensity*/
                0.025, /* scanline intensity*/
                648,   /* scanline count*/
                false  /* grayscale*/
            ]}
        />
        <afterimagePass attachArray="passes" uniforms-damp-value={0.3} />
        <unrealBloomPass attachArray="passes" args={[aspect, 0.24, 1, 1]} />
      </effectComposer>
      </>
    );
};

export default CustomEffects;

