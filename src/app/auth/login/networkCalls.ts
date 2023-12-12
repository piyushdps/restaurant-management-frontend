import { RequestType, httpRequest } from '../../../../services/httpService';

type LoginDataType = {
  email: string;
  password: string;
};

export const login = async (loginData: LoginDataType) => {
  const { data } = await httpRequest({
    type: RequestType.POST,
    data: loginData,
    url: '/v1/auth/login',
  });
  return data;
};
