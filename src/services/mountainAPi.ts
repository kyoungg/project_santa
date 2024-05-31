import { api } from './api';

interface MountainListResponse {
  content: MountainDetail[];
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
export interface VertifyMountain {
  id: number;
  climbDate: string;
  mountain: {
    name: string;
    location: string;
    height: number;
  };
}

export interface VertifyData {
  climbDate: string;
  latitude?: number;
  longitude?: number;
}

export interface TotalMountain {
  name: string;
  location: string;
  height: number;
  latitude: number;
  longitude: number;
  id: number;
}

export interface MountainDetail {
  name: string;
  location: string;
  height: number;
  latitude: number;
  longitude: number;
  id: number;
  description: string;
  point: string;
  transportation: string;
}

interface verifyMountain {
  climbDate: string;
  id: number;
  mountainHeight: number;
  mountainLocation: string;
  mountainName: string;
}

export const getAllMountains = async (page?: number, size?: number) => {
  return await api.get<MountainListResponse>(`mountains?page=${page}&size=${size}`);
};

export const getMountainDetail = async (id: number) => {
  return await api.get<MountainDetail>(`mountains/${id}`);
};

export const postVertifyMountain = async (vertifyMountainData: VertifyData) => {
  return await api.post<verifyMountain>('mountains/verify', vertifyMountainData);
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};
