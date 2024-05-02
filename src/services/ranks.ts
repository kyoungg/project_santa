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

export const getRanks = async (): Promise<Rank[]> => {
  const url = `/ranks?size=5`;
  const res = await api.get(url);
  console.log(res.data.content);
  return res.data.content;
};

export const getRankUsers = async (page: number = 0, size: number = 10): Promise<RankPagination> => {
  const url = `/ranks/rankings?page=${page}&size=${size}`;
  // const url = `/ranks/rankings`;
  const res = await api.get(url);
  console.log('랭킹 페이지네이션 ---------------');
  console.log(res.data.rankings);
  return res.data.rankings;
};

export const getMyRank = async (): Promise<Rank> => {
  const url = `/ranks/rankings`;
  const res = await api.get(url);
  console.log('로그인 유저 랭킹 ---------------');
  console.log(res.data.userRankings);
  return res.data.userRankings;
};
