import ambientLightReducer from './ambientLightReducer';
import spotLightsReducer from './spotLightsReducer';
import planesReducer from './planesReducer';
import shapesReducer from './shapesReducer';
import cameraReducer from './cameraReducer';
import outlineReducer from './outlineReducer';

const stateReducer = (state, action) => {
    return {
        camera: cameraReducer(state.camera, action),
        ambientLight: ambientLightReducer(state.ambientLight, action),
        spotLights: spotLightsReducer(state.spotLights, action),
        planes: planesReducer(state.planes, action),
        shapes: shapesReducer(state.shapes, action),
        outline: outlineReducer(state.outline, action)
    }
}

export default stateReducer;
