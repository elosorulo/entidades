import React, {useEffect} from 'react';
import SequenceService from '../services/SequenceReaderService';
import PolyphonyService from '../services/EventPolyphonyService';
import EventDispatcherService from '../services/EventDispatcherService';
import sequence from '../sequences/sequence.json';
import sprites from '../sequences/sprites.json';
import { useStore } from '../state/store';
import { useThree } from 'react-three-fiber';

const sceneService = SequenceService(sequence, sprites);


const Sequencer = (props) => {
    
    
    const [dispatch] = useStore(state => [state.dispatch]);
    
    const {clock} = useThree();

    useEffect(() => {
        const soundsApi = props.soundsApi;

        EventDispatcherService.play(sceneService.getEvents, sceneService.getStartTime, dispatch, clock, soundsApi);  
    }, []);

    return (<></>);
};

export default Sequencer;
