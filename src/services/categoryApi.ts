import { api } from './api';

interface Category {
  id: number;
  name: string;
}

export const getCategory = async () => {
  return await api.get<Category[]>('/api/categories');
};
