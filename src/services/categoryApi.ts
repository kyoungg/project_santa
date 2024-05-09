import { api } from './api';

interface Category {
  id: number;
  name: string;
}

export interface PreferCategory {
  categoryName: string;
}

interface PostPreferCategory {
  categoryIds: number[];
}

export const getPreferCategory = async () => {
  return await api.get<PreferCategory[]>('users/preferred-categories');
};

export const postPreferCategory = async (preferCategory: PostPreferCategory) => {
  return await api.post('users/preferred-categories', preferCategory);
};

export const getAllCategory = async () => {
  return await api.get<Category[]>('categories');
};
