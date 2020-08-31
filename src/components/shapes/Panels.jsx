import React from 'react';

import { useFrame } from 'react-three-fiber';
import { shapeIdleColor } from '../3d/material/color';
import { useRef } from 'react';
import gradientMap from '../3d/material/gradientMap';
import { TorusBufferGeometry } from 'three';
import { useEffect, useMemo } from 'react';
import { storeApi, useStore} from '../../state/store';
import { addOutlinedMeshAction } from '../../state/actions';
import animateShape from '../animations/behavior/animateShape';
import { Color, VertexColors } from 'three';
import { Object3D } from 'three';
import { Vector3 } from 'three';

const OUTLINE_KEY = "PANELS";

const MATERIAL = "material";

const GEOMETRY = "geometry";

const ATTRIBUTES = "attributes";

const COLOR = "color";

const PANNEL_WIDTH = "7";

const PANNEL_HEIGHT = "7";

const AMOUNT = 200;

const OFFSET_X = 6;

const OFFSET_Y = 10;

const MULTIPLYER = 10;

const GRID_X = 20;

const GRID_Y = 20;


const randomBetween0And1 = () => {
    return Math.floor(Math.random() * 10) / 300;
}

const Z_POSITION = -80;


const gridYPosition = (key, gridMaxY, offsetY) => {
    return Math.floor((key) / gridMaxY) * MULTIPLYER + offsetY;
};

const gridXPosition = (key, gridMaxX, offsetX) => {
    return (key) % gridMaxX * MULTIPLYER  + offsetX;
};

const Panels = (props) => {

    const tempObject = new Object3D();
    const tempColor = new Color();

    const pannelsRef = useRef();
      
    const [dispatch] = useStore(state => [
        state.dispatch
    ]);

    const colorArray = useMemo(() => Float32Array.from(new Array(AMOUNT).fill().flatMap((_) => tempColor.set(`hsla(210, 0%, ${8 + Math.floor(Math.random() * 5)}%, 1)`).toArray())), [])

    const positions = new Array(AMOUNT).fill().map((_, k) => 
        new Vector3(
            gridXPosition(k, GRID_X, OFFSET_X - MULTIPLYER * GRID_X / 2),
            props.rotated ? 0 : gridYPosition(k, GRID_Y, OFFSET_Y - MULTIPLYER * GRID_Y / 4),
            props.rotated ? gridYPosition(k, GRID_Y,  - MULTIPLYER * GRID_Y / 4) : Z_POSITION
        )
    );

    const positionsMin = positions.map(value =>
        {
            return new Vector3(
                value.x,
                value.y,
                value.z - randomBetween0And1()
            )
        }
    );
    
    const positionsMax = positions.map(value =>
        new Vector3(
            value.x,
            value.y,
            value.z + randomBetween0And1()
        )
    );

    const animationOffsets = Array(AMOUNT).fill().map(x => Math.floor(Math.random() * 100));

    useFrame(({clock}) => 
        positionsMax.forEach((positionMin, index) => {
            
            if(props.rotated) tempObject.rotation.x = Math.PI * -0.5;
            const interpolated = positionMin.clone();
            interpolated.lerp(positionsMin[index], (Math.sin((clock.elapsedTime + animationOffsets[index]) % 100) + 1) * 50);
            
            tempObject.position.x = interpolated.x;
            tempObject.position.y = interpolated.y;
            tempObject.position.z = interpolated.z;
            tempObject.updateMatrix();
            pannelsRef.current.setMatrixAt(index, tempObject.matrix);
            pannelsRef.current.instanceMatrix.needsUpdate = true;
        }), 1
    );

    useEffect(() => {;
        dispatch(addOutlinedMeshAction(pannelsRef.current, OUTLINE_KEY));
    },[] );

    
    return (
        <instancedMesh
            {...props}
            ref={pannelsRef}
            args={[null, null, AMOUNT]}
            scale={props.scale ? props.scale : [1, 1, 1]}
        >
            <boxBufferGeometry attach={GEOMETRY} args={[PANNEL_WIDTH, PANNEL_WIDTH, 0.2]}>
                <instancedBufferAttribute attachObject={[ATTRIBUTES, COLOR]} args={[colorArray, 3]} />
            </boxBufferGeometry>
            <meshToonMaterial attach={MATERIAL} gradientMap={gradientMap(3)} vertexColors={VertexColors}/>
        </instancedMesh>
    )
};

export default Panels;
