import React from 'react';
import animateShape from './animateShape';
import { storeApi, useStore } from '../../../state/store';
import { addOutlinedMeshAction } from '../../../state/actions';
import { shapeIdleColor } from '../../3d/material/color';
import { useFrame } from 'react-three-fiber';
import { Color } from 'three';

const useAnimation = (key) => {

    const tempColor = React.useRef(new Color());

    const ref = React.useRef();
      
    const [amount, dispatch] = useStore(state => [
        state[key].amount,
        state.dispatch
    ]);
    
    const colorArray = React.useMemo(() => Float32Array.from(
        new Array(amount)
            .fill()
            .flatMap((_) => tempColor.current.set(shapeIdleColor).toArray())
    ), [])

    useFrame(({clock}) => storeApi
        .getState()[key]
.shapes
        .forEach((shape, index) => {
                if(shape.color) {
                    tempColor.current.set(shape.color).toArray(colorArray, index * 3);
                    ref.current.geometry.attributes.color.needsUpdate = true;
                }
                animateShape(ref.current, clock, shape, index);
            }
        )
    );
    
    React.useEffect(() => {
        dispatch(addOutlinedMeshAction(ref.current, key));
    },[]);
    
    return [ref, amount, colorArray];
};

export default useAnimation;
