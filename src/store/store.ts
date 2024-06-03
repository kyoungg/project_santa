import { create } from 'zustand';
import { GatheringCategoryType } from '../types/gatheringTypes';
//카테고리 상태 관리
interface CategoryState {
  category: GatheringCategoryType;
  setCategory: (category: GatheringCategoryType) => void;
}

export const useCategoryStore = create<CategoryState>((set) => ({
  category: { id: 1, name: '등산' },
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
