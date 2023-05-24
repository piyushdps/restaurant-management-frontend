'use client';

import { useEffect } from 'react';
import { resultOf } from '../../utils/resultOf';
import { RequestType, httpRequest } from '../../services/httpService';

export default function Home() {
  const getInititalData = async () => {
    const { data } = await httpRequest({
      type: RequestType.GET,
      url: '/',
    });
    return data;
  };

  async function connect() {
    const [ok, response] = await resultOf(getInititalData());
    ok ? console.log(response) : console.log('errored');
  }

  useEffect(() => {
    connect();
  });
  return <div></div>;
}
