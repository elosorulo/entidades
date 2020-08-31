import React from 'react';

import useAnimation from './behavior/useAnimation';
import Animation from './Animation';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const GEOMETRY = "geometry";

const KEY = "spheresAnimations";

const RADIUS = 3;
const WIDTH_SEGMENTS = 15;
const HEIGHT_SEGMENTS = 10;
const PHI_START = 0;
const PHI_LENGTH = 6.3;
const THETA_START = 0;
const THETA_LENGTH = 3.1;

const SpheresAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <Animation ref={ref} amount={amount} colors={colorArray}>
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
        </Animation>
    )
};

export default SpheresAnimations;
