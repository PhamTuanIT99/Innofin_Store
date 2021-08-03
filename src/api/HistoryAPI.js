import api from './API';

export const getHistoryCollection = () =>
  api.get('/api/app/mobile/histories').then(({ data }) => data);
export const takeRequest = id =>
  api.get(`/api/app/mobile/cancel-deposit/${id}`).then(({ data }) => data);
export const requestDeposit = body =>
  api.post('/api/app/mobile/request-deposit', body).then(({ data }) => data);
export const getStatistical = () =>
  api.get('/api/app/mobile/list-cash-collection-by-date/{page}').then(({ data }) => data);
export const getHistoryPage = offset =>
  api.get(`/api/app/mobile/list-cash-collection/${offset}`).then(({ data }) => data);
export const getHistoryDepositPage = offset =>
  api.get(`/api/app/mobile/list-cash-deposit/${offset}`).then(({ data }) => data);
