import { create } from 'zustand';
import storeReducer from './reducers/storeReducer';

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
    ringsAnimations: {
      amount: 100,
      lastFree: 0,
      rings: [...Array(100)].map((_, i) => "EMPTY"),
    }
  }
  


export const [useStore, storeApi] = create(set => ({
    ...initialState,
    dispatch: action => set(state => storeReducer(state, action))
}));


