import { Object3D } from 'three';
import { Vector3 } from 'three';
import modulate from './modulate';
import shapesAnimationsReducer from '../../../state/reducers/shapesAnimationsReducer';

const tempObject = new Object3D();

tempObject.position.set(0, 3, 0);
tempObject.updateMatrix();

const interpolation = (initialPosition, finalPosition, alpha) => {
    const interpolated = initialPosition.clone();
    return interpolated.lerp(finalPosition, alpha);
};

const positionInterpolation = (mesh, initialPosition, finalPosition, alpha) => {
    const nextPosition = interpolation(initialPosition, finalPosition, alpha);
    mesh.position.x = nextPosition.x;
    mesh.position.y = nextPosition.y;
    mesh.position.z = nextPosition.z;
};


const scaleInterpolation = (mesh, initialScale, finalScale, alpha, shape) => {
    const nextScale = interpolation(initialScale, finalScale, modulate(shape.modulation, alpha));
    mesh.scale.x = nextScale.x;
    mesh.scale.y = nextScale.y;
    mesh.scale.z = nextScale.z;
};

const arrayToVector = (array) => {
    return new Vector3(
        array[0],
        array[1],
        array[2]
    );
};

const getSegmentDelay = (separation, duration, animationSize, key, speed) => (separation * (duration / animationSize) * (key) * speed);

const getSegmentStartTime = (segmentStartTime, segmentDelay) => segmentStartTime + segmentDelay;

const getSegmentCurrentTime = (clock, segmentStartTime, speed) => (clock.elapsedTime - segmentStartTime) * speed;

const animateShape = (mesh, clock, shape, index) => {
    if(shape !== "EMPTY") {
        const segmentDelay = getSegmentDelay(shape.separation, shape.duration, shape.animationSize, shape.key, shape.speed);
        const segmentStartTime = getSegmentStartTime(shape.startTime, segmentDelay);
        
        const segmentCurrentTime = getSegmentCurrentTime(clock,segmentStartTime, shape.speed);
        
        const a = (segmentCurrentTime / shape.duration);
        const alpha = shape.loop ? (shape.loop.isReverse ? a % 2: a % 1) : a;
        if(alpha >= 0 && ((alpha <2 && shape.loop && shape.loop.isReverse) || alpha < 1)) {
            const initialPosition = arrayToVector(shape.initialPosition);
            const finalPosition = arrayToVector(shape.finalPosition);
            const initialScale = arrayToVector(shape.initialScale);
            const finalScale = arrayToVector(shape.finalScale);
            scaleInterpolation(
                tempObject,
                alpha > 1 ? finalScale : initialScale,
                alpha > 1 ? initialScale : finalScale,
                alpha > 1 ? alpha - 1 : alpha,
                shape
            );
            positionInterpolation(
                tempObject,
                alpha > 1 ? finalPosition : initialPosition,
                alpha > 1 ? initialPosition : finalPosition,
                alpha > 1 ? alpha - 1 : alpha
            );
            tempObject.lookAt(finalPosition);
        } else {
            tempObject.scale.x = 0;
            tempObject.scale.y = 0;
            tempObject.scale.z = 0;
        }
        tempObject.updateMatrix();
        mesh.setMatrixAt(index, tempObject.matrix);
        mesh.instanceMatrix.needsUpdate = true;
    }
}


export default animateShape;
