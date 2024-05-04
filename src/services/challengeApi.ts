import { api } from './api';

export interface ThumbnailChallenge {
  id: number;
  name: string;
  image: string;
}
interface Category {
  name: string;
}
interface Challenge extends ThumbnailChallenge {
  description: string;
  clearStandard: number;
  category: Category;
}
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface Challenges {
  content: Challenge[];
  pageable: Pageable;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}
export const getAllChallenge = async () => {
  return await api.get('challenges');
};

export const getChallenges = async (): Promise<Challenges> => {
  const url = `challenges?page=${0}&size=${10}`;
  const res = await api.get(url);
  return res.data;
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};

export const getChallengeList = async (): Promise<ThumbnailChallenge[]> => {
  const url = `challenges?page=${0}&size=${3}`;
  const res = await api.get(url);
  return res.data.content;
};
