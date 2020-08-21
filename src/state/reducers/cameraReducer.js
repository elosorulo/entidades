import * as types from '../actionTypes';

const cameraReducer = (state, action) => {
    switch(action.type) {
        case types.SET_CAMERA:
            return {
                ...action.props
            }
        default:
            return state
    }
};

export default cameraReducer;
