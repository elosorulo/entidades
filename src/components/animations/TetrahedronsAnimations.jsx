import React from 'react';

import useAnimation from './behavior/useAnimation';
import InstancedMesh from '../3d/mesh/InstancedMesh';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const GEOMETRY = "geometry";

const KEY = "tetrahedronsAnimations";

const RADIUS = 10;
const DETAIL = 0;

const TetrahedronsAnimations = () => {
    
    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <InstancedMesh ref={ref} amount={amount} colors={colorArray}>
            <tetrahedronBufferGeometry
                attach={GEOMETRY}
                args={[RADIUS, DETAIL]}>
                <InstancedMeshColor colors={colorArray}/>
            </tetrahedronBufferGeometry>
        </InstancedMesh>
    )
};

export default TetrahedronsAnimations;
