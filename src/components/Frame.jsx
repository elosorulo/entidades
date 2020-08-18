import React from 'react';
import { Canvas } from 'react-three-fiber';

import Scene from './Scene';

const FullSizeCanvas = (props) => {
    return (
        <Canvas {...props} style={{height: "100vh", width: "100%"}} colorManagement shadowMap/>
    );
}

const Frame = () => {
    return (
        <FullSizeCanvas
            concurrent
            gl={{ antialias: false }}
        >
            <Scene/>
        </FullSizeCanvas>
    );

}

export default Frame;