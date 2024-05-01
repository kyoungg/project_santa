import { api } from './api';

export async function getGatheringList() {
  return await api.get('meetings');
}

export type GatheringListByCategory = {
  leaderId: number;
  meetingId: number;
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string;
  image: string;
  participants: participants[];
};
type participants = {
  userId: number;
  userImage: string;
  userName: string;
};
interface GatheringListResponse {
  content: GatheringListByCategory[];
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
export type GatheringCategory = '맞춤추천' | '등산' | '힐링' | '식도락' | '정상깨기' | '백패킹' | '출사' | '기타';
export function getGatheringListByCategory(category: GatheringCategory, page?: number, size?: number) {
  return api.get<GatheringListResponse>(`meetings/category-search?category=${category}&page=${page}&size=${size}`);
}
type GatheringData = {
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string[];
  image: string;
};
export async function postGathering(data: GatheringData) {
  await api.post('meetings', data);
}

export async function getGatheringSearchResult(tag: string) {
  return await api.get(`meetings/tag-search?tag=${tag}`);
}
