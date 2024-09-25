import axios from 'axios';
import Cookies from 'js-cookie';

class HttpHelpers {
  constructor() {
    this.subscribers = [];
  }

  setBaseUrl(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl;
    this.authenticatedAxios = axios.create({ baseURL: this.apiBaseUrl });
    this.unAuthenticatedAxios = axios.create({ baseURL: this.apiBaseUrl });
    this.addAuthenticationInterceptor();
    this.addUnAuthenticationInterceptor();
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter(callback => callback(accessToken));
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  addAuthenticationInterceptor() {
    this.authenticatedAxios.interceptors.request.use(
      async config => {
        // ** Get token from AsyncStorage/LocalStorage
        const accessToken = Cookies.get('token');
        // ** If token is present add it to request's Authorization Header
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
      },
      error => {
        // window.location.href = '404'
        // Promise.reject(error);
        if (error.response && error.response.status === 404) {
          console.log('Resource not found!');
        } else {
          console.log('An error occurred:', error.message);
        }
      }
    );
  }

  addUnAuthenticationInterceptor() {
    this.unAuthenticatedAxios.interceptors.request.use(
      async config => {
        config.headers.Accept = 'application/json';
        // config.headers['X-CSRF-TOKEN'] = 
        return config;
      },
      error => {
        // window.location.href = '404'
        // Promise.reject(error);
        if (error.response && error.response.status === 404) {
          console.log('Resource not found!');
        } else {
          console.log('An error occurred:', error.message);
        }
      }
    );
    this.unAuthenticatedAxios.interceptors.response.use((response) => {
      return response;
    }, (error) => {

      if (error?.response?.status === 404) {
        // window.location.href = '/404'
      }
      return Promise.reject(error);
    });
  }
}

export default new HttpHelpers();
