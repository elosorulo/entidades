import * as types from '../actionTypes';

const spotLightsReducer = (state, action) => {
    switch(action.type) {
        case types.SET_SPOT_LIGHT:
            return [
                ...state,
                {
                    key: action.key,
                    ...action.props
                }
            ];
        case types.UPDATE_SPOT_LIGHT:
            return [
                state.filter(spotLight => spotLight.key === action.key),
                {
                    key: action.key,
                    ...action.props
                }
            ]
        case types.REMOVE_SPOT_LIGHT:
            return state.filter(spotLight => spotLight.key === action.key);
        default:
            return state;
    }
};

export default spotLightsReducer;
