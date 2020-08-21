import React from 'react';
import { useStore } from '../../state/store';
import SpotLight from '../3d/light/SpotLight';

const SpotLightsProvider = () => {

    const [spotLights] = useStore(state => [state.spotLights])

    return spotLights.map(spotLight => <SpotLight {...spotLight}/>);
};

export default SpotLightsProvider;
