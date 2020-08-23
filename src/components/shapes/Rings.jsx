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

const OUTLINE_KEY = "RINGS";

const MATERIAL = "material"

const RADIUS = 0.5;

const TUBE = 0.1;

const RADIAL_SEGMENTS = 9;

const TUBULAR_SEGMENTS = 47;

const ARC = 6.3;

const RingAnimations = (props) => {

    const ringsRef = useRef();

    const [amount, dispatch] = useStore(state => [
        state.ringsAnimations.amount,
        state.dispatch
    ]);

    const geometry = new TorusBufferGeometry(
        RADIUS,
        TUBE,
        RADIAL_SEGMENTS,
        TUBULAR_SEGMENTS,
        ARC
    );

    useFrame(({clock}) => storeApi
        .getState()
        .ringsAnimations
        .rings
        .forEach((ring, index) =>
            animateShape(ringsRef.current, clock, ring, index)
        )
    );

    
    useEffect(() => {
        dispatch(addOutlinedMeshAction(ringsRef.current, OUTLINE_KEY));
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
            <meshToonMaterial attach={MATERIAL} color={shapeIdleColor} gradientMap={gradientMap(3)}/>
        </instancedMesh>
    )
};

export default RingAnimations;
