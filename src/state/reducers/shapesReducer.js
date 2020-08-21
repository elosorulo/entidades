import * as types from '../actionTypes';

const shapesReducer = (state, action) => {
    switch(action.type) {
        case types.PLAY_BASIC_SHAPE:
            return [
                ...state,
                {
                    key: action.key,
                    ...action.props,
                }
            ];
        case types.CLEAN_BASIC_SHAPE:
            return state.filter(shape => shape.key === action.key);
        default:
            return state;
    }
};

export default shapesReducer;
