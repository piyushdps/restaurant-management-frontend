import { httpRequest } from '../../services/httpService';

/**
 * add the token to axios instance defaults as header
 * @param token the token sent from the server
 */
export const setupAuthHeader = (token: string) => {
  httpRequest.setAuthHeader(token);
};
