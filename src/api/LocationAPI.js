import api from './API';

export const GetCities = () => api.get('/api/app/cities/cities-lookup').then(({ data }) => data);

export const GetDistricts = id =>
  api.get(`/api/app/districts/${id}/district-by-city`).then(({ data }) => data);

export const GetWards = id => api.get(`/api/app/wards/${id}/district`).then(({ data }) => data);
