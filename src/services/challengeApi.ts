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

export interface Challenges {
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

export interface TotalChallenge {
  id: 0;
  name: string;
  description: string;
  image: string;
  clearStandard: 0;
  category: {
    name: string;
  };
}

export interface ProgressChallengeData {
  completionDate: null | string;
  progress: number;
  challenge: {
    name: number;
    description: string;
    image: string;
    clearStandard: number;
  };
}

interface AllChallengeResponse {
  content: TotalChallenge[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  empty: boolean;
}

//챌린지 페이지 무한스크롤 적용 후 삭제해야함
export const getAllChallenge = async (page?: number, size?: number) => {
  return await api.get<AllChallengeResponse>(`challenges?page=${page}&size=${size}`);
};

export const getUserChallenge = async (completion: boolean) => {
  return await api.get(`users/completion?completion=${completion}`);
};

export const getChallenges = async (): Promise<Challenges> => {
  const url = `challenges?page=${0}&size=${10}`;
  const res = await api.get(url);
  return res.data;
};

export const getChallengeList = async (): Promise<ThumbnailChallenge[]> => {
  const url = `challenges?page=${0}&size=${3}`;
  const res = await api.get(url);
  return res.data.content;
};
