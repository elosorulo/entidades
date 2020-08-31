import React from 'react';

import useAnimation from './behavior/useAnimation';
import Animation from './Animation';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const KEY = "ringsAnimations";

const GEOMETRY = "geometry";

const RADIUS = 0.5;
const TUBE = 0.2;
const RADIAL_SEGMENTS = 9;
const TUBULAR_SEGMENTS = 47;
const ARC = 6.3;

const RingAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);
    
    return (
        <Animation ref={ref} amount={amount} colors={colorArray}>
            <torusBufferGeometry attach={GEOMETRY} args={[RADIUS, TUBE, RADIAL_SEGMENTS, TUBULAR_SEGMENTS, ARC]}>
                <InstancedMeshColor colors={colorArray}/>
            </torusBufferGeometry>
        </Animation>
    );
};

export default RingAnimations;
