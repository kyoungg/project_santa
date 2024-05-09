import { api } from './api';
import { TotalChallenge } from './challengeApi';

export interface AddChallengeForm {
  name: string;
  categoryId: number;
  description: string;
  clearStandard: number;
  imageFile: File;
  image?: string | null;
}

const url = '/challenges';

const makeFormData = (formData: any) => {
  const fd = new FormData();
  Object.keys(formData).forEach((key) => {
    if (formData[key] !== undefined) fd.append(key, formData[key]);
  });
  return fd;
};

export const addChallenge = async (addChallengeForm: AddChallengeForm) => {
  const formdata = makeFormData(addChallengeForm);
  const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const res = await api.post(url, formdata, config);
  console.log(res);
  return res;
};

export const getAllChallengList = async () => {
  const res = await api.get(url);
  console.log(res.data.content);
  return res.data.content;
};

export const getChallenge = async (id: string): Promise<TotalChallenge> => {
  const params = `${url}/${id}`;
  const res = await api.get(params);
  return res.data;
};

// export const updateChallenge = async (addChallengeForm: AddChallengeForm, id: string) => {
//   const formdata = makeFormData(addChallengeForm);

//   const config = {
//     headers: {
//       'Content-Type': 'multipart/form-data',
//     },
//   };
//   return api.patch(`${url}/${id}`, formdata, config);
// };

export function updateChallenge({ id, data }: { id: string, data: FormData }) {
  return api.patch(`${url}/${id}`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    }
  })
}
export const deleteChallenge = async (id: number) => {
  return api.delete(`${url}/${id}`);
};
