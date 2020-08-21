import React, {useEffect} from 'react';
import SceneService from '../services/SceneService';
import EventDispatcherService from '../services/EventDispatcherService';
import sceneFile from '../scene.json';
import { useStore } from '../state/store';

const sceneService = SceneService(sceneFile);

const Player = (props) => {

    const [dispatch] = useStore(state => [state.dispatch]);
  
    useEffect(() => {
        EventDispatcherService.play(sceneService.getEvents, dispatch);  
    }, []);

    return (<></>);
};

export default Player;
