import React from 'react';
import {Howl} from 'howler';

const SoundContext = React.createContext();

let sounds = {};

const PREFIX = "/sound/";

const EXTENSION = ".wav";

export const eventTypes = {
    ADD_SOUND: "ADD_SOUND",
    PLAY_SOUND: "PLAY_SOUND",
    STOP_SOUND: "STOP_SOUND",
    REMOVE_SOUND: "REMOVE_SOUND",
    LOOP_SOUND: "LOOP_SOUND"
};

const soundFns = {
    add: (key, file) => {    
        console.log(sounds);
        sounds[key] = new Howl({
            src: [PREFIX + file + EXTENSION]
        }); 
        console.log(sounds);
    },
    loop: (key, loop) => {
        sounds[key].loop(loop);
    },
    play: (key) => {
        console.log(sounds);
        sounds[key].play();
    },
    stop: (key) => {
        sounds[key].stop();
    },
    remove: (key) => {
        sounds[key].unload();
        delete sounds[key];
    }
}

var soundApi = {
    ...soundFns,
    execute: (action) => {
        switch(action.type) {
            case eventTypes.ADD_SOUND:
                console.log(action);
                soundFns.add(action.props.key, action.props.file);
                break;
            case eventTypes.PLAY_SOUND:
                soundFns.play(action.props.key);
                break;
            case eventTypes.LOOP_SOUND:
                soundFns.loop(action.props.key, action.props.loop);
            case eventTypes.STOP_SOUND:
                soundFns.stop(action.props.key);
                break;
            case eventTypes.REMOVE_SOUND:
                soundFns.remove(action.props.key);
                break;
            default:
                break;
        }
    }
};

export const Sound = (props) => {

    return (
        <SoundContext.Provider value={soundApi}>
            {props.children}
        </SoundContext.Provider>
    );
};

export const useSoundsApi = () => React.useContext(SoundContext);
