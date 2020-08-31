import React from 'react';

const ATTRIBUTES = "attributes";
const COLOR = "color";

const InstancedMeshColor = (props) => {
    return (<instancedBufferAttribute attachObject={[ATTRIBUTES, COLOR]} args={[props.colors, 3]} />);
};

export default InstancedMeshColor;
