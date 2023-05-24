import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

/** duration after which the api call is considered to have failed */
const fetchTimeoutMs = 30 * 1000;

/**
 * create an http-axios-instance which will use gateway mf API as base URL
 * This instance will be used by `httpHandler` Internally
 */
const createApiHandler = () => {
  const instance = axios.create();
  instance.interceptors.request.use(
    (config) => ({
      ...config,
      timeout: fetchTimeoutMs,
      withCredentials: true,
      // change to mock server url when required
      // baseURL: 'https://0f9fc73f-dc55-48c8-9c00-b2b2b31b1529.mock.pstmn.io',
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    }),
    (error) => Promise.reject(error),
  );
  return instance;
};

const apiHandler = createApiHandler();

const setAuthHeader = (token: string) => {
  apiHandler.defaults.headers.common['Authorization'] = token;
};

export const enum RequestType {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
  PUT = 'put',
}

interface HttpRequestProps {
  type?: RequestType;
  url: string;
  // cos these props have any type defined in AxiosRequestConfig interface.
  params?: any;
  data?: any;
  config?: AxiosRequestConfig;
}

export const httpRequest = <ResponseData = any>({
  type = RequestType.GET,
  url,
  params,
  data,
  config = {},
}: HttpRequestProps) => {
  return apiHandler.request<ResponseData>({
    ...config,
    method: type,
    url,
    data,
    params,
  });
};
httpRequest.setAuthHeader = setAuthHeader;

type CancellableHttpRequest<ResponseData = any> = {
  /** sends the created HTTP request */
  send: () => Promise<AxiosResponse<ResponseData, any>>;
  /**
   * cancels the HTTP requests
   * If the method is called before send, the actual request won't even be attempted
   */
  cancel: () => void;
  /** Checks if the request is cancelled in catch block */
  isCancelled: (err: Error) => boolean;
};

export const createCancellableHttpRequest = <ResponseData = any>({
  type = RequestType.GET,
  url,
  config,
  params,
}: HttpRequestProps): CancellableHttpRequest<ResponseData> => {
  const source = axios.CancelToken.source();
  return {
    send: () =>
      httpRequest({
        type,
        url,
        params,
        config: { ...config, cancelToken: source.token },
      }),
    cancel: () => source.cancel(),
    isCancelled: (err: Error) => axios.isCancel(err),
  };
};
