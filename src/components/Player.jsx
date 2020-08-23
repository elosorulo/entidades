import React, {useEffect} from 'react';
import SceneService from '../services/SceneService';
import EventDispatcherService from '../services/EventDispatcherService';
import sceneFile from '../scene.json';
import { useStore } from '../state/store';
import { useThree } from 'react-three-fiber';
import { useSoundsApi } from './Sound';

const sceneService = SceneService(sceneFile);

const Player = (props) => {
    
    const soundsApi = props.soundsApi;
    
    const [dispatch] = useStore(state => [state.dispatch]);
    
    const {clock} = useThree();

    useEffect(() => {
        EventDispatcherService.play(sceneService.getEvents, dispatch, clock, soundsApi);  
    }, []);

    return (<></>);
};

export default Player;
