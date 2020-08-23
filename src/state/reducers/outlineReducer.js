import * as actionTypes from '../actionTypes';
import { omit } from 'lodash';

const outlineReducer = (state, action) => {
    switch(action.type) {
        case actionTypes.ADD_OUTLINED_MESH:
            return {
                ...state,
                [action.key]: action.mesh
            };
        case actionTypes.SET_OUTLINED_MESH:
            return omit(state, action.key);
        default:
            return state;
    };
};

export default outlineReducer;
