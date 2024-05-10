import { api } from './api';
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

export type GatheringDetailType = {
  meetingId: number;
  leaderId: number;
  userEmail: string;
  meetingName: string;
  categoryName: string;
  mountainName: string;
  description: string;
  headcount: number;
  date: string;
  tags: string[];
  image: string;
  imageFile: string;
  participants: [
    {
      userId: number,
      userName: string,
      userImage: string
    }
  ]
}

type userReport = {
  reason: string;
  reportedParticipantId: number;

}
export type GatheringCategory = '맞춤추천' | '등산' | '힐링' | '식도락' | '정상깨기' | '백패킹' | '출사' | '기타';

//모임 조회 api
export async function getGatheringList() {
  return await api.get('meetings');
}

//카테고리별 모임 조회 api
export function getGatheringListByCategory(category: GatheringCategory, page?: number, size?: number) {
  return api.get<GatheringListResponse>(`meetings/category-search?category=${category}&page=${page}&size=${size}`);
}

//모임 생성 api
export async function postGathering(data: FormData) {
  await api.post('meetings', data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}

//검색 결과 조회 api
export async function getGatheringSearchResult(tag: string) {
  return await api.get(`meetings/tag-search?tag=${tag}`);
}

//모임 상세보기 api
export function getGatheringDetailById(meetingId: string) {
  return api.get<GatheringDetailType>(`meetings/${meetingId}`);
}

//모임 삭제 api
export function deleteGathering(meetingId: number) {
  return api.delete(`meetings/${meetingId}`);
}

//모임 수정 api
export function editGathering({ meetingId, data }: { meetingId: number, data: FormData }) {
  return api.patch(`meetings/${meetingId}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

//나의 모임 조회 
export function getMyGatherings(page: number, size: number) {
  return api.get<GatheringListResponse>(`meetings/my-meetings?page=${page}&size=${size}`)
}
//인기모임 조회 
export function getPopularGatherings(page: number, size: number) {
  return api.get<GatheringListResponse>(`meetings/participants?page=${page}&size=${size}`)
}

//모임 종료하기 
export function closeGathering(meetingId: string) {
  return api.post(`meetings/${meetingId}/end`)
}

//모임 참여하기 
export function joinGathering(meetingId: string) {
  return api.post(`meetings/${meetingId}/participants`)
}

//신고하기
export function userReport(data: userReport) {
  return api.post('reports', data)
}

export function getUserGathering() {
  return api.get<GatheringListResponse>('meetings/my-meetings');
}