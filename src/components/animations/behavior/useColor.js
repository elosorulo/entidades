import { shapeIdleColor } from '../../3d/material/color';
import { useStore } from '../../../state/store';
import { Color } from 'three';

const useColor = (amount) => {

    const [amount] = useStore(state => [
        state.dodecahedronsAnimations.amount,
    ]);

    const tempColor = React.useRef(new Color());
    const colorArray = React.useMemo(() => Float32Array.from(new Array(amount).fill().flatMap((_) => tempColor.current.set(shapeIdleColor).toArray())), [])
    
    return colorArray;
}

export default useColor;
