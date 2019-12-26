import React from 'react';

import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, { retries: 3 });
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

export const BASE_URL=process.env.NODE_ENV === 'production'
? '/'
: 'http://localhost:5925/';


export const API_URL =`${BASE_URL}api/v1/`;


const httpClient = axios.create({
  baseURL: API_URL,
});





httpClient.interceptors.response.use(
  (response) => {
    if (response.data.hasOwnProperty('success')) {
      if (response.data.success === false) {
        return Promise.reject(response.data);
      }
      return response.data;
    } else {
      return response.data;
    }
  },
  (error) => {

    if (error.response && error.response.status === 403) {
      // router.push({ name: 'NotFound' });
    } else {
      if (error.response && error.response.data)
        return Promise.reject(error.response.data);
      return Promise.reject({ desciption: "error occurred during response ", success: false });
    }
  }
);


export default httpClient;




