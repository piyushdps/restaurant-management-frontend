'use client';

import { setupAuthHeader } from '@/utils/util';
import { create } from 'zustand';

type UserData = {
  id: string;
  isEmailVerified: boolean;
  name: string;
  email: string;
  role: string;
  authToken: string;
  refreshToken: string;
};
type UserStore = {
  userData: UserData;
  setUserData: (data: UserData) => void;
};

let userDataResetter: () => void;
let authorizationResetter: () => void;

const initialUserState = {
  userData: {
    id: '',
    isEmailVerified: false,
    name: '',
    email: '',
    role: '',
    authToken: '',
    refreshToken: '',
  },
};
const initialAuthorizationState = {
  auth: false,
};

const useAuthorizationStore = create<{ auth: boolean }>()((set) => {
  authorizationResetter = () => set(initialAuthorizationState);
  return {
    ...initialAuthorizationState,
    setUserData: (auth: boolean) => {
      set({
        auth,
      });
    },
  };
});

const useUserStore = create<UserStore>()((set) => {
  userDataResetter = () => set(initialUserState);
  return {
    ...initialUserState,
    setUserData: (user: UserData) => {
      window.localStorage.setItem('authToken', user.authToken);
      window.localStorage.setItem('refreshToken', user.refreshToken);
      setupAuthHeader(
        user.authToken || window.localStorage.getItem('authToken') || '',
      );
      set({
        userData: user,
      });
    },
  };
});

export {
  useUserStore,
  userDataResetter,
  useAuthorizationStore,
  authorizationResetter,
};
