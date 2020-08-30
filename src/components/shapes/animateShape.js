import { Object3D } from 'three';
import { Vector3 } from 'three';
import modulate from './modulate';

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


const scaleInterpolation = (mesh, scale, alpha, shape) => {
    const nextScale = interpolation(scale, new Vector3(0, 0, scale.z), modulate(shape.modulation, alpha));
    
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

const getSegmentEndTime = (segmentStartTime, duration) => segmentStartTime + duration;

const animateShape = (mesh, clock, shape, index) => {
    if(shape !== "EMPTY") {
        const segmentDelay = getSegmentDelay(shape.separation, shape.duration, shape.animationSize, shape.key, shape.speed);
        const segmentStartTime = getSegmentStartTime(shape.startTime, segmentDelay);
        const segmentEndTime = getSegmentEndTime(segmentStartTime, shape.duration);
        
        const segmentCurrentTime = getSegmentCurrentTime(clock,segmentStartTime, shape.speed);
        
        const alpha = segmentCurrentTime / shape.duration;
        if(alpha >= 0 && alpha <1) {
            console.log(shape.key);
            const initialPosition = arrayToVector(shape.initialPosition);
            const finalPosition = arrayToVector(shape.finalPosition);
            const scale = arrayToVector(shape.scale);
            scaleInterpolation(tempObject, scale, alpha, shape);
            positionInterpolation(tempObject, initialPosition, finalPosition, alpha);
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
