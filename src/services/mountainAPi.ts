import { api } from './api';

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

export const postVertifyMountain = async (vertifyMountainData: VertifyData) => {
  return await api.post('mountains/verify', vertifyMountainData);
};

export const getMyMountains = async () => {
  return await api.get('users/mountains');
};
