import React from 'react';
import { useStore } from '../../state/store';
import Plane from '../3d/geometry/Plane';

const PlanesProvider = () => {

    const [planes] = useStore(state => [state.planes])

    return planes.map(plane => <Plane {...plane}/>);
};

export default PlanesProvider;
