import * as THREE from 'three';

const gradientMap = (size) => {

    let colors = new Uint8Array(size).map((x, i) => i / size * 256);
    
    let gm = new THREE.DataTexture( colors, colors.length, 1, THREE.LuminanceFormat );
    
    gm.minFilter = THREE.NearestFilter;
    gm.magFilter = THREE.NearestFilter;
    gm.generateMipmaps = false;
    return gm;
}

export default gradientMap;
