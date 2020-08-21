import React from 'react';
import { PerspectiveCamera } from 'drei';
import { Vector3 } from 'three';

const Camera = (props) => {
    
    const cameraRef = React.createRef();

    const cameraProps = {
        ...props,
        rotation: props.rotation ? props.rotation.map(coordinate => coordinate * Math.PI) : [0, 0, 0]
    }
    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            {...cameraProps}
        />
    );
};

export default Camera;
