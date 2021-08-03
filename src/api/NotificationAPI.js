import api from './API';

export const GetlistNotify = () =>
  api.get('/api/app/mobile/notifications/1').then(({ data }) => data);
export const GetUpdateSeenNotifi = id =>
  api.get(`/api/app/mobile/notifications-update-seen/${id}`).then(({ data }) => data);
export const PushNotify = body =>
  api.post('/api/app/mobile/register-device', body).then(({ data }) => data);
export const Markallread = () =>
  api.get('/api/app/mobile/notifications-mark-all-read').then(({ data }) => data);
