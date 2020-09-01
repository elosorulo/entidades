import React from 'react';

import gradientMap from '../material/gradientMap';
import { VertexColors } from 'three';

const MATERIAL = "material";

const Animation = React.forwardRef((props, ref) => {
    return (
        <instancedMesh
            {...props}
            receiveShadow
            castShadow
            ref={ref}
            args={[null, null, props.amount]}
            scale={props.scale ? props.scale : [1, 1, 1]}
        >
            {props.children}
            <meshToonMaterial attach={MATERIAL} gradientMap={gradientMap(3)} vertexColors={VertexColors}/>
        </instancedMesh>
    );
});

export default Animation;
