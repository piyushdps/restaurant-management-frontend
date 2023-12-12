'use client';

import { FormEvent, LegacyRef, useReducer, useRef } from 'react';
import { resultOf } from '../../../../utils/resultOf';
import '../styles.css';
import { login as loginAPI } from './networkCalls';
import SimpleReactValidator from 'simple-react-validator';
import useForceUpdate from '@/hooks/useForceRender';
import { httpRequest } from '../../../../services/httpService';
import Link from 'next/link';
import toastify, { ToastVariant } from '@/utils/toastify';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/useUserStore';

export default function Home() {
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const forceUpdate = useForceUpdate();
  const router = useRouter();
  const { setUserData } = useUserStore();
  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } }),
  );

  async function login() {
    if (simpleValidator.current.allValid()) {
      const [ok, response] = await resultOf(
        loginAPI({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
        }),
      );
      if (!ok)
        toastify(response.response?.data.message, ToastVariant.ERROR, {
          toastId: 1,
        });
      else {
        window.localStorage.setItem(
          'refreshToken',
          response.tokens.refresh.token,
        );
        setUserData({
          ...response.user,
          authToken: `Bearer ${response.tokens.access.token}`,
          refreshToken: response.tokens.refresh.token,
        });
        router.push('/dashboard');
      }
    } else {
      simpleValidator.current.showMessages();
      // rerender to show messages for the first time
      // you can use the autoForceUpdate option to do this automatically`
      forceUpdate();
    }
  }

  return (
    <>
      <div className="flex">
        <h1 className="font-bold uppercase text-3xl">Login Here</h1>
      </div>

      <div className="my-4">
        <input
          className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="email"
          name="email"
          placeholder="Email*"
          ref={emailInputRef}
          required
          onBlur={() => simpleValidator.current.showMessageFor('email')}
        />
        <span>
          {simpleValidator.current.message(
            'email',
            emailInputRef.current?.value,
            'email|required',
          )}
        </span>

        <input
          className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="password"
          placeholder="Password*"
          name="password"
          required
          onBlur={() => simpleValidator.current.showMessageFor('password')}
          ref={passwordInputRef}
        />
        <span>
          {simpleValidator.current.message(
            'password',
            passwordInputRef.current?.value,
            'required',
          )}
        </span>
      </div>
      <div className="my-2 w-full flex justify-center">
        <button
          onClick={login}
          type="submit"
          className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-1/3
                      focus:outline-none focus:shadow-outline"
        >
          Login
        </button>
      </div>
      <p className="w-full text-center">
        Don't have an account?{' '}
        <span className="text-blue-400 hover:text-blue-600 transition-colors hover:animate-pulse cursor-pointer">
          <Link href={'/auth/signup'}>Signup here</Link>
        </span>
      </p>
    </>
  );
}
