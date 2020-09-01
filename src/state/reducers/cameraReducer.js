import * as types from '../actionTypes';

const cameraReducer = (state, action) => {
    switch(action.type) {
        case types.SET_CAMERA:
            return {
                ...action.props
            }
        case types.MOVE_CAMERA:
            return {
                ...action.props,
                startTime: action.startTime
            }
        default:
            return state
    }
};

export default cameraReducer;
