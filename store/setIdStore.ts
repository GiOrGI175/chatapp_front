import { create } from 'zustand';

type newAccountState = {
  id: number | null;
  setId: (id: number) => void;
};

export const useId = create<newAccountState>((set) => ({
  id: null,
  setId: (id) => set({ id }),
}));
