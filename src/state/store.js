import { create } from 'zustand';
import storeReducer from './reducers/storeReducer';

const AMOUNT = 1000;
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
  dodecahedronsAnimations: animation(AMOUNT),
  tetrahedronsAnimations: animation(AMOUNT),
  lathesAnimations: animation(AMOUNT),
  spheresAnimations: animation(AMOUNT),
  ringsAnimations: animation(AMOUNT)
};

export const [useStore, storeApi] = create(set => ({
    ...initialState,
    dispatch: action => set(state => storeReducer(state, action))
}));
