import React from 'react';
import Ring from '../3d/geometry/Ring';
import { cleanBasicShapeAction } from '../../state/actions';
import { useThree } from 'react-three-fiber';
import { useStore } from '../../state/store';
import { Vector3 } from 'three';
import { useState } from 'react';
import useOutline from '../../state/useOutline';

const SCALE_X = 2;
const SCALE_Y = 4;
const SCALE_Z = 2;

const RINGS_AMOUNT = 10;

const arrayFrom0ToN = (n) => Array.from(Array(n).keys());

const startTimes = (globalStartTime, globalDuration, ringsAmount) => {
    const segment = (globalDuration / 2) / ringsAmount;
    return arrayFrom0ToN(ringsAmount).map(key => globalStartTime + (key + 1) * segment);
}
const cleanUp = (dispatch, key) => {
    dispatch(cleanBasicShapeAction(key));
};

const onLoad = (addOutline) => (mesh) => {
    addOutline(mesh);
};

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

const scaleInterpolation = (mesh, alpha) => {
    const nextScale = interpolation(new Vector3(SCALE_X, SCALE_Y, SCALE_Z), new Vector3(0, 0, SCALE_Z), Math.abs(Math.cos(Math.PI * alpha)));
    mesh.scale.x = nextScale.x;
    mesh.scale.y = nextScale.y;
    mesh.scale.z = nextScale.z;
};

const hideIfNotBeingAnimated = (startTime, mesh, clock) => {
    if(startTime > clock.elapsedTime && mesh.visible) {
        mesh.visible = false;
    }
    else if(startTime < clock.elapsedTime && !mesh.visible) {
        mesh.visible = true;
    }
}

const mayBeAnimate = (mesh, clock, duration, speed, startTime, initialPosition, finalPosition, cleaner) => {
    const currentTime = (clock.elapsedTime - startTime) * speed;
    const animationOver = mesh.visible && currentTime / duration > 0.99;
    if(animationOver && mesh.visible) {
        mesh.visible = false;
        window.setTimeout(() => cleaner.cleanUp(mesh), 1000);
    }
    else {
        mesh.lookAt(finalPosition);
        const alpha = currentTime / duration;
        scaleInterpolation(mesh, alpha);
        positionInterpolation(mesh, initialPosition, finalPosition, alpha);
    }
}

const cleaner = (finalRing, key, isOver, removeOutline) => {
    return {
        cleanUp: (mesh) => {
            removeOutline(mesh);
            if(finalRing === key) isOver(true);
        }
    };
}

const updateRing = (duration, speed, startTime, initialPosition, finalPosition, cleaner) => (mesh, clock) => {
    hideIfNotBeingAnimated(startTime, mesh, clock);
    mayBeAnimate(mesh, clock, duration, speed, startTime, initialPosition, finalPosition, cleaner);
};

const positionVector = (position) => {
    return new Vector3(
        position[0],
        position[1],
        position[2]
    );
};

const BasicShape = (props) => {

    const [dispatch, outline] = useStore(state => {
        return [
          state.dispatch,
          state.outline
        ]
      })
    
    const {clock} = useThree();

    const [over, isOver] = useState(false);

    const [globalStartTime] = useState(clock.elapsedTime);

    React.useEffect(() => {
        if(over)cleanUp(dispatch, props.id);
    }, [over]);

    const initialposition = positionVector(props.initialPosition)
    const finalPosition = positionVector(props.finalPosition)

    return (
        <group>
            {startTimes(globalStartTime, props.duration / 6, RINGS_AMOUNT).map((startTime, key) =>
                <Ring
                    key={`${props.id}_${key}`}
                    scale={[SCALE_X, SCALE_Y, SCALE_Z]}
                    onLoad={onLoad(outline.addOutline)}
                    update={
                        updateRing(
                            props.duration / 2,
                            props.speed,
                            startTime,
                            initialposition,
                            finalPosition,
                            cleaner(
                                isOver,
                                RINGS_AMOUNT - 1,
                                key,
                                outline.removeOutline
                            )
                        )
                    }
                    position={props.initialPosition ? props.initialPosition : [0, 0, 0]}
                />
            )}
        </group>        
    );
};

export default BasicShape;
