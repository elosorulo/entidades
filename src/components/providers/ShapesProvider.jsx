import React from 'react';
import { useStore } from '../../state/store';
import BasicShape from '../shapes/BasicShape';

const ShapesProvider = () => {

    const [shapes] = useStore(state => [state.shapes])

    return shapes.map(shape => <BasicShape {...shape} id={shape.key}/>);
};

export default ShapesProvider;
