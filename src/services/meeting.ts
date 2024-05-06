import { api } from './api';

interface Participats {
  userId: number;
  userName: string;
  userImage: string;
}

export interface Meeting {
  meetingId: string;
  leaderId: number;
  date: string;
  meetingName: string;
  categoryName: string;
  description: string;
  mountainName: string;
  image: string;
  tag: string[];
  participants: Participats[];
}

export const getMeetings = async (): Promise<Meeting[]> => {
  const url = `/meetings`;
  const res = await api.get(url);
  return res.data.content;
};
