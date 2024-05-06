import { api } from './api';

export interface Rank {
  id: number;
  rank: number;
  image: string;
  nickname: string;
  score: number;
}

interface Pageable {
  offset: number;
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  unpaged: boolean;
}
export interface RankPagination extends Rank, Pageable {
  content: Rank[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  pageable: Pageable;
  size: number;
  totalElements: number;
  totalPages: number;
}

export const getMainPagesRanks = async (): Promise<Rank[]> => {
  const url = `/ranks?page=0&size=5`;
  const res = await api.get(url);
  return res.data.rankings.content;
};

export const getTop3Ranks = async (): Promise<Rank[]> => {
  const url = `/ranks?page=0&size=3`;
  const res = await api.get(url);
  return res.data.rankings.content;
};

export const getRankUsers = async (page: number = 0, size: number = 10): Promise<RankPagination> => {
  const url = `/ranks?page=${page}&size=${size}`;
  const res = await api.get(url);
  return res.data.rankings;
};

export const getMyRank = async (): Promise<Rank> => {
  const url = `/ranks`;
  const res = await api.get(url);
  console.log(res.data.userRanking);
  return res.data.userRanking;
};
