import api from './API';

export const getProfileDetail = () =>
  api.get('/api/mobile/my-profile/get-profile').then(({ data }) => data);

export const getAllRoles = () => api.get('/api/identity/roles/all').then(({ data }) => data.items);

export const getUserRoles = id =>
  api.get(`/api/identity/users/${id}/roles`).then(({ data }) => data.items);

export const getUsers = (params = { maxResultCount: 10, skipCount: 0 }) =>
  api.get('/api/identity/users', { params }).then(({ data }) => data);

export const getUserById = id => api.get(`/api/identity/users/${id}`).then(({ data }) => data);

export const createUser = body => api.post('/api/identity/users', body).then(({ data }) => data);

export const updateUser = (body, id) =>
  api.put(`/api/identity/users/${id}`, body).then(({ data }) => data);

export const removeUser = id => api.delete(`/api/identity/users/${id}`);

export const updateProfileDetail = body =>
  api.post('/api/mobile/my-profile/update-profile', body).then(({ data }) => data);

export const changePassword = body =>
  api.post('/api/identity/my-profile/change-password', body).then(({ data }) => data);

export const forgotpassword = body =>
  api.post('/api/account/send-password-reset-code', body).then(({ data }) => data);

export const UpdateImageIndentity = body =>
  api.post('/api/mobile/my-profile/update-identity', body).then(({ data }) => data);

export const getTypeIdentity = () => api.get('/api/app/identity-type').then(({ data }) => data);

export const getHistoryStatisticalPage = (FromDate, ToDate) =>
  api
    .get(`/api/app/mobile/list-cash-collection-by-date/1?fromDate=${FromDate}&toDate=${ToDate}`)
    .then(({ data }) => data);
