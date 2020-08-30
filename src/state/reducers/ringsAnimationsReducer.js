import * as types from '../actionTypes';
import { first, last } from 'lodash';

const betweenRange = (index, firstIndex, latestIndex) => {
    return (index >= firstIndex && index <= latestIndex);
};

const getFirstIndex = (lastFree, animationSize, amount) => {
    
    return lastFree + animationSize > amount ? 0 : lastFree % amount;
};

const getLastIndex = (firstIndex, animationSize) => {
    return firstIndex + (animationSize === 0 ? 0 : animationSize - 1);
};

const getNextFree = (firstIndex, animationSize) => {
    return firstIndex + animationSize;
};

const getRings = (rings, firstIndex, lastIndex, newRing) => {
    console.log(firstIndex, lastIndex);
    return rings.map((ring, index) => {
        return betweenRange(
            index,
            firstIndex,
            lastIndex,
        ) ? {
                ...newRing,
                key: index - firstIndex
            } : ring
    });
};

const updateRingsAnimations = (rings, amount, lastFree, startTime, animationSize, newRing) => {
    const firstIndex = getFirstIndex(lastFree, animationSize, amount);
    const lastIndex = getLastIndex(firstIndex, animationSize);
    const nextFree = getNextFree(firstIndex, animationSize);
    
    return {
        amount: amount,
        lastFree: nextFree,
        rings: getRings(rings, firstIndex, lastIndex, {
            startTime: startTime,
            animationSize: animationSize,
            ...newRing
        })
    };
};

export const ringsAnimationsReducer = (state, action) => {
    
    switch(action.type) {
        case types.PLAY_RINGS_ANIMATION:
            return updateRingsAnimations(
                state.rings,
                state.amount,
                state.lastFree,
                action.startTime,
                action.props.animationSize,
                action.props.ring
            );
        default:
            return state;
    };
};
