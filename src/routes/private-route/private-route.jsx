import { Outlet, Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
import MainLayout from '../../components/Layouts/MainLayout';


function PrivateRoute() {
  const userLocalStorage = localStorage.getItem('user');
  const user = userLocalStorage && userLocalStorage !== 'undefined' && JSON.parse(localStorage.getItem('user'));
  // const user = useSelector(state => state.user);


  if (!user || !user.email) {
    return <Navigate to='/login' replace />;
  }
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

export default PrivateRoute;
