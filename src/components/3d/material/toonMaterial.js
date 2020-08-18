import { MeshToonMaterial } from 'three';
import gradientMap from './gradientMap';

const toonMaterial = (color) => new MeshToonMaterial({
    gradientMap: gradientMap(3),
    color: (color),
});

export default toonMaterial;
