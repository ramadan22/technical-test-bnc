import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface MoviesLikeTypes {
  ids: number[];
  setMovieLike: (id: number) => void;
}

const useMovieLike = create(
  persist<MoviesLikeTypes>(
    (set) => ({
      ids: [],
      setMovieLike: (param) => set((state) => {
        const find = state.ids.find((item) => item === param);
        let id = [...state.ids];

        if (find) {
          id = state.ids.filter((item) => item !== param);
        } else {
          id.push(param);
        }

        return {
          ids: id,
        };
      }),
    }),
    {
      name: 'useMovieLike',
    },
  ),
);

export default useMovieLike;
