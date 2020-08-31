import React from 'react';

import useAnimation from './behavior/useAnimation';
import Animation from './Animation';
import InstancedMeshColor from '../3d/material/InstancedMeshColor';

const KEY = "dodecahedronsAnimations";

const GEOMETRY = "geometry";

const RADIUS = 0.5;
const DETAIL = 0;

const DodecahedronsAnimations = () => {

    const [ref, amount, colorArray] = useAnimation(KEY);

    return (
        <Animation ref={ref} amount={amount} colors={colorArray}>
            <dodecahedronBufferGeometry attach={GEOMETRY} args={[RADIUS, DETAIL]}>
                <InstancedMeshColor colors={colorArray}/>
            </dodecahedronBufferGeometry>
        </Animation>
    )
};

export default DodecahedronsAnimations;
