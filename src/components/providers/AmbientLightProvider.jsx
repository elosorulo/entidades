import React from 'react';
import { useStore } from '../../state/store';

const AmbientLightProvider = () => {

    const [ambientLight] = useStore(state => [state.ambientLight])

    return(<ambientLight {...ambientLight}/>);
};

export default AmbientLightProvider;
