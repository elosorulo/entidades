import React, { useState, useCallback } from 'react';
import { useFrame } from 'react-three-fiber';
import toonMaterial from '../material/toonMaterial';
import { TorusBufferGeometry } from 'three';
import { shapeHoverColor, shapeIdleColor } from '../material/color';

const useOnLoad = (onLoad) => {
  const [ref, setRef] = useState(null);
  const refCallback = useCallback(node => {
    setRef(node);
    if (node !== null) {
      onLoad(node);
    }
  }, []);
  return [ref, refCallback];
}

const Ring = React.forwardRef((props) => {
    // This reference will give us direct access to the mesh
    
    const [meshRef, meshCallback] = useOnLoad(props.onLoad);

    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({clock}, delta) => {
      if(props.update)props.update(meshRef, clock, delta)
    })

    const material = toonMaterial(shapeIdleColor);
    const geometry = new TorusBufferGeometry(
      0.5,
      0.1,
      9,
      47,
      6.3
    )

    return (
      <mesh
        {...props}
        receiveShadow={true}
        castShadow={true}
        ref={meshCallback}
        scale={props.scale ? props.scale : [1, 1, 1]}
        material = {material}
        geometry = {geometry}
        rotation = {props.rotation}
      />
    )
  });

  export default Ring;
