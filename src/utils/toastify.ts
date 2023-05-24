import { ReactNode } from 'react';
import { toast } from 'react-toastify';

export enum ToastVariant {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
}

const toastify = (
  content: ReactNode | string | null | undefined,
  type: ToastVariant,
  config: any = {},
) => {
  return toast(content, {
    type,
    ...config,
  });
};

export default toastify;
