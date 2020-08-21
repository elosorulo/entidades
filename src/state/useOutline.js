import create from 'zustand'

const [useOutline] = create(set => ({
  addOutline: () => {},
  removeOutline: () => {},
  setAddOutline: (selectObject) => set( state => (
    {
      ...state,
      addOutline: selectObject
    }
  )),
  setRemoveOutline: (deselectObject) => set( state => (
    {
      ...state,
      removeOutline: deselectObject
    }
  ))
}));

export default useOutline;
