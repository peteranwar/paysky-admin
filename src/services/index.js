import * as helpers from './helpers';
import AuthApiEndpoints from './auth.api';
import UserApiEndpoints from './user.api';

const Api = {
  ...helpers,
  auth: AuthApiEndpoints,
  user: UserApiEndpoints,
};

export default Api;
