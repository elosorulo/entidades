import * as types from '../actionTypes';

const planesReducer = (state, action) => {
    switch(action.type) {
        case types.SET_PLANE:
            return [
                ...state,
                {
                    key: action.key,
                    ...action.props
                }
            ];
        case types.UPDATE_PLANE:
            return [
                state.filter(plane => plane.key === action.key),
                {
                    key: action.key,
                    ...action.props
                }
            ]
        case types.REMOVE_PLANE:
            return state.filter(plane => plane.key === action.key);
        default:
            return state;
    }
};

export default planesReducer;
