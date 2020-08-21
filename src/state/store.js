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
    outline: {}
  }
  


export const [useStore, storeApi] = create(set => ({
    ...initialState,
    dispatch: action => set(state => storeReducer(state, action))
}));


