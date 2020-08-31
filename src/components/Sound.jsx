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
    add: (key, file, startTime) => {
        sounds[key] = new Howl({
            src: [PREFIX + file + EXTENSION],
            sprite: {
                [`${key}_sound`]: [startTime * 1000, 1800000]
            }
        });
    },
    loop: (key, loop) => {
        sounds[key].loop(loop);
    },
    play: (key) => {
        sounds[key].play(`${key}_sound`);
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
                soundFns.add(action.props.key, action.props.file, action.startTime);
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
