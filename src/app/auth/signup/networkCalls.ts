import { RequestType, httpRequest } from '../../../../services/httpService';

type SignupDataType = {
  email: string;
  password: string;
  name: string;
};

export const signup = async (loginData: SignupDataType) => {
  const { data } = await httpRequest({
    type: RequestType.POST,
    data: loginData,
    url: '/v1/auth/register',
  });
  return data;
};
