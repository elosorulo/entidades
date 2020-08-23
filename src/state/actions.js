import * as types from './actionTypes';

export const cleanBasicShapeAction = (key) => {
    return {
        type: types.CLEAN_BASIC_SHAPE,
        key: key
    };
};

export const addOutlinedMeshAction = (mesh, key) => {
    return {
        type: types.ADD_OUTLINED_MESH,
        key: key,
        mesh: mesh
    };
};

export const removeOutlinedMeshAction = (key) => {
    return {
        type: types.SET_OUTLINED_MESH,
        key: key
    };
};

export const playRingsAnimationAction = (animationSize, props) => {
    return {
        type: types.PLAY_RINGS_ANIMATION,
        props: props
    };
}
