import HttpHelpers from './helpers';

const AuthApiEndpoints = {
  login: data => {
    return HttpHelpers.unAuthenticatedAxios
      .post(`auth/login`, data)
      .then(response => response.data);
  },

};

export default AuthApiEndpoints;
