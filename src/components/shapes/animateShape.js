import { Object3D } from 'three';
import { Vector3 } from 'three';

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

const scaleInterpolation = (mesh, scale, alpha) => {
    const nextScale = interpolation(scale, new Vector3(0, 0, scale.z), Math.abs(Math.cos(Math.PI * alpha)));
    
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

const getSegmentDelay = (separation, duration, animationSize, key, speed) => (separation * (duration / (10 * animationSize)) * key) / speed;

const getSegmentStartTime = (segmentStartTime, segmentDelay) => segmentStartTime + segmentDelay;

const getSegmentCurrentTime = (clock, segmentStartTime, speed) => (clock.elapsedTime - segmentStartTime) * speed;

const getSegmentEndTime = (segmentStartTime, duration) => segmentStartTime + duration;

const animateShape = (mesh, clock, ring, index) => {
    if(ring !== "EMPTY") {             
        const segmentDelay = getSegmentDelay(ring.separation, ring.duration, ring.animationSize, ring.key, ring.speed);
        const segmentStartTime = getSegmentStartTime(ring.startTime, segmentDelay);
        const segmentCurrentTime = getSegmentCurrentTime(clock,segmentStartTime, ring.speed);
        const segmentEndTime = getSegmentEndTime(segmentStartTime, ring.duration);
        
        const alpha = segmentCurrentTime / segmentEndTime;

        if(alpha >= 0 && alpha <1) {
            const initialPosition = arrayToVector(ring.initialPosition);
            const finalPosition = arrayToVector(ring.finalPosition);
            const scale = arrayToVector(ring.scale);
            scaleInterpolation(tempObject, scale, alpha);
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
