import React from 'react';

import useAnimation from './behavior/useAnimation';
import InstancedMesh from '../3d/mesh/InstancedMesh';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const GEOMETRY = "geometry";

const KEY = "lathesAnimations";

const SEGMENTS = 12;
const PHI_START = 0;
const PHI_LENGTH = 6.3;

const LathesAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <InstancedMesh ref={ref} amount={amount} colors={colorArray}>
            <latheBufferGeometry attach={GEOMETRY} args={[SEGMENTS, PHI_START, PHI_LENGTH]}>
                <InstancedMeshColor colors={colorArray}/>
            </latheBufferGeometry>
        </InstancedMesh>
    )
};

export default LathesAnimations;
