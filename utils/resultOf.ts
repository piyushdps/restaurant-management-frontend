// TODO: implement wrap, encase as needed, https://imhoff.blog/posts/using-results-in-typescript

import { AxiosError } from 'axios';

export type Result<T, E = Error> = [ok: true, value: T] | [ok: false, error: E];

/**
 * util method to reduce usage of try...catch /then().catch()
 */
export const resultOf = async <T, E = AxiosError<{ message: string }>>(
  promise: Promise<T>,
): Promise<Result<T, E>> => {
  try {
    const value = await promise;
    return [true, value];
  } catch (error) {
    return [false, <E>error];
  }
};
