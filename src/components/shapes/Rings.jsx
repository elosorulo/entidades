import React from 'react';

import { useFrame } from 'react-three-fiber';
import { shapeIdleColor } from '../3d/material/color';
import { useRef } from 'react';
import gradientMap from '../3d/material/gradientMap';
import { TorusBufferGeometry } from 'three';
import { useEffect, useMemo } from 'react';
import { storeApi, useStore} from '../../state/store';
import { addOutlinedMeshAction } from '../../state/actions';
import animateShape from './animateShape';
import { Color, VertexColors } from 'three';

import { flatMap } from 'lodash';

const OUTLINE_KEY = "RINGS";

const MATERIAL = "material"

const RADIUS = 0.5;

const TUBE = 0.2;

const RADIAL_SEGMENTS = 9;

const TUBULAR_SEGMENTS = 47;

const ARC = 6.3;


const tempColor = new Color();

const RingAnimations = (props) => {

    const ringsRef = useRef();
      
    const [amount, dispatch] = useStore(state => [
        state.ringsAnimations.amount,
        state.dispatch
    ]);
    
    const colorArray = useMemo(() => Float32Array.from(new Array(amount).fill().flatMap((_) => tempColor.set(shapeIdleColor).toArray())), [])


    useFrame(({clock}) => storeApi
        .getState()
        .ringsAnimations
        .rings
        .forEach((ring, index) => {
                if(ring.color) {
                    tempColor.set(ring.color).toArray(colorArray, index * 3);
                    ringsRef.current.geometry.attributes.color.needsUpdate = true;
                }
                animateShape(ringsRef.current, clock, ring, index);
            }
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
            args={[null, null, amount]}
            scale={props.scale ? props.scale : [1, 1, 1]}
        >
            <torusBufferGeometry attach={"geometry"} args={[RADIUS, TUBE, RADIAL_SEGMENTS, TUBULAR_SEGMENTS, ARC]}>
                <instancedBufferAttribute attachObject={['attributes', 'color']} args={[colorArray, 3]} />
            </torusBufferGeometry>
            <meshToonMaterial attach={MATERIAL} gradientMap={gradientMap(3)} vertexColors={VertexColors}/>
        </instancedMesh>
    )
};

export default RingAnimations;
