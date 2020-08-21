import React from 'react';
import { useStore } from '../../state/store';
import Camera from '../3d/camera/Camera';

const CameraProvider = () => {

    const [camera] = useStore(state => [state.camera])

    return(<Camera {...camera}/>);
};

export default CameraProvider;
