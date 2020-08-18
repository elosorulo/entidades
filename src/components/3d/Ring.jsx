import React, { useState, useCallback } from 'react';
import { useFrame } from 'react-three-fiber';
import toonMaterial from './material/toonMaterial';
import { TorusBufferGeometry } from 'three';
import { shapeHoverColor, shapeIdleColor } from './material/color';

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

const Ring = React.forwardRef((props, ref) => {
    // This reference will give us direct access to the mesh
    
    const [meshRef, meshCallback] = useOnLoad(props.onLoad);
    
    ref = meshRef;

    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
      
    // Rotate mesh every frame, this is outside of React without overhead
    useFrame(({clock}, delta) => {
      //props.handleMesh(meshRef, clock, delta)
    })

    const material = toonMaterial(hovered ? shapeHoverColor : shapeIdleColor);
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
        ref={meshCallback}
        scale={active ? [2, 2, 2] : [1, 1, 1]}
        onClick={e => setActive(!active)}
        onPointerOver={e => setHover(true)}
        onPointerOut={e => setHover(false)}
        material = {material}
        geometry = {geometry}
        rotation = {[Math.PI/2, Math.PI/2, 0]}
      />
    )
  });

  export default Ring;
