import api from './API';

export const getRequestCollection = () =>
  api.get('/api/app/mobile/my-request-collection').then(({ data }) => data);
export const getMyProcessCollection = () =>
  api.get('/api/app/mobile/my-progress').then(({ data }) => data);
export const takeRequest = id =>
  api.get(`/api/app/mobile/take-request/${id}`).then(({ data }) => data);
export const startRequest = () => api.get(`/api/app/mobile/start-collect`).then(({ data }) => data);
export const GetStatement = () =>
  api.get(`/api/app/mobile/request-modify-statement`).then(({ data }) => data);
export const completeCollection = body =>
  api.post(`/api/app/mobile/complete-collection`, body).then(({ data }) => data);
export const GetNotifyStatement = () =>
  api.get(`/api/app/mobile/request-modify-statement`).then(({ data }) => data);
