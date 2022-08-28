import {useEffect, useState} from 'react';

export const useGetCities = () => {
  const [cities, setCities] = useState<string[]>([]);
  console.log(
    'body',
    JSON.stringify({
      country: 'North Korea',
    }),
  );
  useEffect(() => {
    fetch('https://countriesnow.space/api/v0.1/countries/cities', {
      method: 'POST',
      body: JSON.stringify({
        country: 'North Korea',
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(res => {
        console.log('res', res);
        setCities(res?.data);
      });
  }, []);
  return {cities};
};
