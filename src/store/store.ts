import { create } from 'zustand';
import { GatheringCategory } from '../services/gatheringApi';
//카테고리 상태 관리
interface CategoryState {
  category: GatheringCategory;
  setCategory: (category: GatheringCategory) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: '맞춤추천',
  setCategory: (category) => set({ category: category }),
}));

interface searchValueState {
  searchValue: string;
  setSearchValue: (item: string) => void;
}
export const useSearchValueStore = create<searchValueState>((set) => ({
  searchValue: '',
  setSearchValue: (item) => set({ searchValue: item }),
}));
