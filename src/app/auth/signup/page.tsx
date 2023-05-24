'use client';

import { FormEvent, LegacyRef, useReducer, useRef } from 'react';
import { resultOf } from '../../../../utils/resultOf';
import '../styles.css';
import { signup as signupApi } from './networkCalls';
import SimpleReactValidator from 'simple-react-validator';
import useForceUpdate from '@/hooks/useForceRender';
import { httpRequest } from '../../../../services/httpService';
import Link from 'next/link';
import toastify, { ToastVariant } from '@/utils/toastify';
import { useRouter } from 'next/navigation';

export default function Home() {
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const nameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const forceUpdate = useForceUpdate();
  const router = useRouter();

  const simpleValidator = useRef(
    new SimpleReactValidator({ autoForceUpdate: { forceUpdate: forceUpdate } }),
  );

  async function signup() {
    if (simpleValidator.current.allValid()) {
      const [ok, response] = await resultOf(
        signupApi({
          email: emailInputRef.current.value,
          password: passwordInputRef.current.value,
          name: nameInputRef.current.value,
        }),
      );
      if (!ok) toastify(response.response?.data.message, ToastVariant.ERROR);
      else {
        router.push('/auth/login');
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
        <h1 className="font-bold uppercase text-3xl">Signup Here</h1>
      </div>

      <div className="my-4">
        <input
          className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
          type="text"
          name="name"
          placeholder="Name*"
          ref={nameInputRef}
          required
          onBlur={() => simpleValidator.current.showMessageFor('name')}
        />
        <span>
          {simpleValidator.current.message(
            'name',
            nameInputRef.current?.value,
            'required',
          )}
        </span>

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
            'required|min:8|alpha_num',
            {
              message: 'must contain a alphabet and a number',
            },
          )}
        </span>
      </div>
      <div className="my-2 w-full flex justify-center">
        <button
          onClick={signup}
          className="uppercase text-sm font-bold tracking-wide bg-blue-900 text-gray-100 p-3 rounded-lg w-1/3
                      focus:outline-none focus:shadow-outline"
        >
          Send Message
        </button>
      </div>
      <p className="w-full text-center">
        Already have an account?{' '}
        <span className="text-blue-400 hover:text-blue-600 transition-colors hover:animate-pulse cursor-pointer">
          <Link href={'/auth/login'}>Login here</Link>
        </span>
      </p>
    </>
  );
}
