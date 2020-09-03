import React from 'react';
import { PerspectiveCamera } from 'drei';
import { Vector3 } from 'three';
import { useFrame } from 'react-three-fiber';

const arrayToVector = (array) => new Vector3(array[0], array[1], array[2]);


const getCurrentTime = (clock, segmentStartTime, speed) => (clock.elapsedTime - segmentStartTime) * speed;

const Camera = (props) => {
    
    const cameraRef = React.createRef();

    const cameraProps = {
        ...props,
        rotation: props.rotation ? props.rotation.map(coordinate => coordinate * Math.PI) : [0, 0, 0]
    }

    useFrame(({clock}) => {
        if(props.animation) {
            const startTime = props.startTime;
            const currentTime = getCurrentTime(clock,startTime, props.animation.speed);
            const alpha = (currentTime / props.animation.duration);
            const initialPosition = arrayToVector(props.animation.initialPosition);
            const finalPosition = arrayToVector(props.animation.finalPosition);
            const initialRotation = arrayToVector(props.animation.initialRotation.map(r => r * Math.PI));
            const finalRotation = arrayToVector(props.animation.finalRotation.map(r => r * Math.PI));
           
            if(alpha >= 0 && alpha <= 1) {
                if(props.animation.initialPosition && props.animation.finalPosition) {
                    const interpolation = initialPosition.lerp(finalPosition, alpha);
                    cameraRef.current.position.x = interpolation.x;
                    cameraRef.current.position.y = interpolation.y;
                    cameraRef.current.position.z = interpolation.z;
                }
                if(props.animation.initialRotation && props.animation.finalRotation) {
                    const interpolation = initialRotation.lerp(finalRotation, alpha);
                    cameraRef.current.rotation.x = interpolation.x;
                    cameraRef.current.rotation.y = interpolation.y;
                    cameraRef.current.rotation.z = interpolation.z;
                }
            } else if(alpha < 0) {
                cameraRef.current.position.x = initialPosition.x;
                cameraRef.current.position.y = initialPosition.y;
                cameraRef.current.position.z = initialPosition.z;
            }
            else if(alpha > 1) {

                cameraRef.current.rotation.x = finalRotation.x;
                cameraRef.current.rotation.y = finalRotation.y;
                cameraRef.current.rotation.z = finalRotation.z;
            }
        }
    })

    return (
        <PerspectiveCamera
            ref={cameraRef}
            makeDefault
            {...cameraProps}
            position={cameraProps.position ? cameraProps.position : [0, 0, 0]}
            rotation={cameraProps.position ? cameraProps.rotation.map(r => r * Math.PI) : [0, 0, 0]}
        />
    );
};

export default Camera;
