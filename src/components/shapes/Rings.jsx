import React from 'react';

import { useFrame } from 'react-three-fiber';
import { shapeIdleColor } from '../3d/material/color';
import { useRef } from 'react';
import gradientMap from '../3d/material/gradientMap';
import { TorusBufferGeometry } from 'three';
import { useEffect } from 'react';
import { storeApi, useStore} from '../../state/store';
import { addOutlinedMeshAction } from '../../state/actions';
import animateShape from './animateShape';

const RingAnimations = (props) => {

    const ringsRef = useRef();

    const [amount, dispatch] = useStore(state => [
        state.ringsAnimations.amount,
        state.dispatch
    ]);

    const geometry = new TorusBufferGeometry(0.5, 0.1, 9, 47, 6.3);

    useFrame(({clock}) => storeApi
        .getState()
        .ringsAnimations
        .rings
        .forEach((ring, index) =>
            animateShape(ringsRef.current, clock, ring, index)
        )
    );

    
    useEffect(() => {
        dispatch(addOutlinedMeshAction(ringsRef.current, "rings"));
    },[] );

    
    return (
        <instancedMesh
            {...props}
            receiveShadow
            castShadow
            ref={ringsRef}
            geometry={geometry}
            args={[null, null, amount]}
            scale={props.scale ? props.scale : [1, 1, 1]}
        >
            <meshToonMaterial attach="material" color={shapeIdleColor} gradientMap={gradientMap(3)}/>
        </instancedMesh>
    )
};

export default RingAnimations;
