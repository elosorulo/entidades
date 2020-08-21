import * as actionTypes from '../actionTypes';

const outlineReducer = (state, action) => {
    switch(action.type) {
        case actionTypes.SET_ADD_OUTLINE:
            return {
                ...state,
                addOutline: action.addOutline()
            };
        case actionTypes.SET_REMOVE_OUTLINE:
            return {
                ...state,
                removeOutline: action.removeOutline()
            };
        default:
            return state;
    };
};

export default outlineReducer;
