'use client';

import { useEffect, useState } from 'react';
import { resultOf } from '../../../utils/resultOf';
import { getRestaurants } from './networkCalls';
import toastify, { ToastVariant } from '@/utils/toastify';
import RestaurantCard from '@/components/RestaurantCard';

const Home = async (props: any) => {
  const [restaurantsData, setRestaurantsData] = useState<any>([]);

  const fetchRestaurants = async () => {
    const [ok, response] = await resultOf(getRestaurants());
    if (!ok)
      toastify(response.response?.data.message, ToastVariant.ERROR, {
        toastId: 1,
      });
    else {
      setRestaurantsData(response.results);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  return (
    <div className="flex gap-9 flex-wrap justify-center">
      {restaurantsData.map((restaurant: any) => {
        return (
          <RestaurantCard
            content={restaurant.contact}
            onBtnClick={() => {}}
            title={restaurant.name}
          />
        );
      })}
    </div>
  );
};

export default Home;
