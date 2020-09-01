import React from 'react';

import useAnimation from './behavior/useAnimation';
import InstancedMesh from '../3d/mesh/InstancedMesh';
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
        <InstancedMesh ref={ref} amount={amount} colors={colorArray}>
            <torusBufferGeometry attach={GEOMETRY} args={[RADIUS, TUBE, RADIAL_SEGMENTS, TUBULAR_SEGMENTS, ARC]}>
                <InstancedMeshColor colors={colorArray}/>
            </torusBufferGeometry>
        </InstancedMesh>
    );
};

export default RingAnimations;
