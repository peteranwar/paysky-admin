

import HttpHelpers from './helpers';

const UserApiEndpoints = {
    getUsers: (data) => {
        return HttpHelpers.authenticatedAxios
            .get(`users`, data)
            .then(response => response.data);
    },
};

export default UserApiEndpoints;
