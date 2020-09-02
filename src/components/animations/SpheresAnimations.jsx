import React from 'react';

import useAnimation from './behavior/useAnimation';
import InstancedMesh from '../3d/mesh/InstancedMesh';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const GEOMETRY = "geometry";

const KEY = "spheresAnimations";

const RADIUS = 3;
const WIDTH_SEGMENTS = 25;
const HEIGHT_SEGMENTS = 25;
const PHI_START = 0;
const PHI_LENGTH = 6.3;
const THETA_START = 0;
const THETA_LENGTH = 3.15;

const SpheresAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <InstancedMesh ref={ref} amount={amount} colors={colorArray}>
            <sphereBufferGeometry
                attach={GEOMETRY}
                args={[
                    RADIUS,
                    WIDTH_SEGMENTS,
                    HEIGHT_SEGMENTS,
                    PHI_START,
                    PHI_LENGTH,
                    THETA_START,
                    THETA_LENGTH
                ]}>
                <InstancedMeshColor colors={colorArray}/>
            </sphereBufferGeometry>
        </InstancedMesh>
    )
};

export default SpheresAnimations;
