import { Navigate, Outlet } from 'react-router-dom';

import AuthLayout from '../../components/Layouts/AuthLayout';


function PublicRoute() {
  const userLocalStorage = localStorage.getItem('user');
  const user = userLocalStorage && userLocalStorage !== 'undefined' && JSON.parse(localStorage.getItem('user'));

  if (user?.email) {
    return <Navigate to='/' replace />;
  }

  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default PublicRoute;
