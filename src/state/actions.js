import * as Constants from './actionTypes';

export const cleanBasicShapeAction = (key) => {
    return {
        type: Constants.CLEAN_BASIC_SHAPE,
        key: key
    };
};

export const setAddOutlineAction = (addOutline) => {
    return {
        type: Constants.SET_ADD_OUTLINE,
        addOutline: addOutline
    };
};

export const setRemoveOutlineAction = (removeOutline) => {
    return {
        type: Constants.SET_REMOVE_OUTLINE,
        removeOutline: removeOutline
    };
};
