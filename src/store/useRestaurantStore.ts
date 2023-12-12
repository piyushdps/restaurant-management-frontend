'use client';

import { create } from 'zustand';

type RestaurantStore = {
  restaurantId: string;
  authToken: string;
  name: string;
  email: string;
  role: string;
};
type restaurantStore = {
  restaurantStore: RestaurantStore;
  setRestaurantStore: (data: RestaurantStore) => void;
};

let restaurantStoreResetter: () => void;

const initialState = {
  restaurantStore: {
    restaurantId: '',
    authToken: '',
    name: '',
    email: '',
    role: '',
  },
};

const useRestaurantStore = create<restaurantStore>()((set) => {
  restaurantStoreResetter = () => set(initialState);
  return {
    ...initialState,
    setRestaurantStore: (restaurant: RestaurantStore) => {
      window.localStorage.setItem('authToken', restaurant.authToken);
      set({
        restaurantStore: restaurant,
      });
    },
  };
});

export { useRestaurantStore, restaurantStoreResetter };
