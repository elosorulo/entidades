import * as types from '../actionTypes';

const ambientLightReducer = (state, action) => {
    switch(action.type) {
        case types.SET_AMBIENT_LIGHT:
            return {
                ...action.props
            }
        default:
            return state
    }
};

export default ambientLightReducer;
