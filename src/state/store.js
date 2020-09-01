import { create } from 'zustand';
import storeReducer from './reducers/storeReducer';

const RINGS_AMOUNT = 10000;
const DODECAHEDRONS_AMOUNT = 0;
const SPHERES_AMOUNT = 1000;
const LATHES_AMOUNT = 0;
const TETRAHEDRONS_AMOUNT = 0;
const EMPTY = "EMPTY";

const animation = (amount) => {
  return {
    amount: amount,
    lastFree: 0,
    shapes: [...Array(amount)].map(() => EMPTY),
  }
};

const initialState = {
  camera: {
    position: [0, 0, 0]
  },
  ambientLight: {
    intensity: 0.5
  },
  spotLights: [],
  shapes: [],
  planes: [],
  outline: {},
  dodecahedronsAnimations: animation(DODECAHEDRONS_AMOUNT),
  tetrahedronsAnimations: animation(TETRAHEDRONS_AMOUNT),
  lathesAnimations: animation(LATHES_AMOUNT),
  spheresAnimations: animation(SPHERES_AMOUNT),
  ringsAnimations: animation(RINGS_AMOUNT)
};

export const [useStore, storeApi] = create(set => ({
    ...initialState,
    dispatch: action => set(state => storeReducer(state, action))
}));
