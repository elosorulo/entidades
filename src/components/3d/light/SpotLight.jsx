import React from 'react';
import { useFrame } from 'react-three-fiber';
import { Mesh } from 'three';

const SHADOW_MAP_SIZE = 4096;

const SpotLight = (props) => {

    const lightTarget = new Mesh();
    
    const spotLightRef = React.useRef();

    useFrame(({clock}, delta) => {
        if(props.update) props.update(spotLightRef, clock, delta)
    });

    return (
        <group>
            <primitive
                object={lightTarget}
                position={props.target}
            />
            <spotLight
                ref={spotLightRef}
                position={props.position}
                castShadow={true}
                shadow-mapSize-width={SHADOW_MAP_SIZE}
                shadow-mapSize-height={SHADOW_MAP_SIZE}
                target={lightTarget}
            />
        </group>
    );
};

export default SpotLight;
