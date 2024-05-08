import { api } from './api';

interface Category {
  id: number;
  name: string;
}

interface PreferCategory {
  categoryIds: number[];
}

export const getPreferCategory = async () => {
  return await api.get('users/preferred-categories');
};

export const postPreferCategory = async (preferCategory: PreferCategory) => {
  return await api.post('users/preferred-categories', preferCategory);
};

export const getAllCategory = async () => {
  return await api.get<Category[]>('categories');
};
