import { RequestType, httpRequest } from '../../../services/httpService';

export const getRestaurants = async () => {
  const { data } = await httpRequest({
    type: RequestType.GET,
    url: '/v1/restaurants',
  });
  return data;
};

export const logout = async (refreshToken: string) => {
  const { data } = await httpRequest({
    type: RequestType.POST,
    url: '/v1/auth/logout',
    data: { refreshToken },
  });
  return data;
};

export const getUserProfile = async (refreshToken: string) => {
  const { data } = await httpRequest({
    type: RequestType.POST,
    data: { refreshToken },
    url: '/v1/auth/refresh-tokens',
  });
  return data;
};
