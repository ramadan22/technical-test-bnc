import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface LanguageStoreTypes {
  language: 'bahasa' | 'english';
  setLanguage: (param: 'bahasa' | 'english') => void;
}

const useLanguageStore = create(
  persist<LanguageStoreTypes>(
    (set) => ({
      language: 'bahasa',
      setLanguage: (param) => set({ language: param }),
    }),
    {
      name: 'useLanguageStore',
    },
  ),
);

export default useLanguageStore;
