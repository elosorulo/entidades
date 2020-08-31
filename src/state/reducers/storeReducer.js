import ambientLightReducer from './ambientLightReducer';
import spotLightsReducer from './spotLightsReducer';
import planesReducer from './planesReducer';
import cameraReducer from './cameraReducer';
import outlineReducer from './outlineReducer';
import shapesAnimationsReducer from './shapesAnimationsReducer';
import * as types from '../actionTypes';

const stateReducer = (state, action) => {
    return {
        camera: cameraReducer(state.camera, action),
        ambientLight: ambientLightReducer(state.ambientLight, action),
        spotLights: spotLightsReducer(state.spotLights, action),
        planes: planesReducer(state.planes, action),
        outline: outlineReducer(state.outline, action),
        ringsAnimations: shapesAnimationsReducer(types.PLAY_RINGS_ANIMATION)(state.ringsAnimations, action),
        dodecahedronsAnimations: shapesAnimationsReducer(types.PLAY_DODECAHEDRONS_ANIMATION)(state.dodecahedronsAnimations, action),
        lathesAnimations: shapesAnimationsReducer(types.PLAY_LATHES_ANIMATION)(state.lathesAnimations, action),
        spheresAnimations: shapesAnimationsReducer(types.PLAY_SPHERES_ANIMATION)(state.spheresAnimations, action),
        tetrahedronsAnimations: shapesAnimationsReducer(types.PLAY_TETRAHEDRONS_ANIMATION)(state.tetrahedronsAnimations, action)
    }
}

export default stateReducer;
