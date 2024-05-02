import { api } from './api';

interface Category {
  name: string;
}
interface Challenge {
  id: number;
  name: string;
  description: string;
  imag: string;
  clearStandard: number;
  category: Category;
}

export const getAllChallenge = async () => {
  return await api.get<Challenge>('/api/challenges');
};
