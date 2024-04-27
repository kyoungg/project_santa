import { api } from './api';

export const getMeetings = async () => {
  const url = `/meetings`;
  return api.get(url);
};
