import { create } from 'zustand';

type ChatState = {
  selectedChatId: number | null;
  setSelectedChatId: (id: number) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  selectedChatId: null,
  setSelectedChatId: (id) => set({ selectedChatId: id }),
}));
