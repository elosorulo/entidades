import React from 'react';

import useAnimation from './behavior/useAnimation';
import Animation from './Animation';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const GEOMETRY = "geometry";

const KEY = "tetrahedronsAnimations";

const RADIUS = 10;
const DETAIL = 0;

const TetrahedronsAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <Animation ref={ref} amount={amount} colors={colorArray}>
            <tetrahedronBufferGeometry
                attach={GEOMETRY}
                args={[RADIUS, DETAIL]}>
                <InstancedMeshColor colors={colorArray}/>
            </tetrahedronBufferGeometry>
        </Animation>
    )
};

export default TetrahedronsAnimations;
