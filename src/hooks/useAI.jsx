import { create } from 'zustand';

const useAI = create((set) => ({
  isVisible: false,
  toggle: () => set((state) => ({ isVisible: !state.isVisible })),
  reset: () => set({ isVisible: false }),
}));

export default useAI;