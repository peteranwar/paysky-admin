import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClientProvider } from 'react-query';

// Global styles
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

import ThemeConfig from "./ui/theme/theme-config";
import CssBaseline from "@mui/material/CssBaseline";

import PublicRoute from './routes/public-route/public-route';
import PrivateRoute from './routes/private-route/private-route';

import { ToastContainer, Slide } from 'react-toastify';

import { queryClient } from './libs/react-query';
import HttpHelpers from './services/helpers';

const Login = lazy(() => import('./pages/login'));
const Home = lazy(() => import('./pages/home'));
const Products = lazy(() => import('./pages/products'));
const ProductDetails = lazy(() => import('./pages/products/ProductDetails'));
const AddProduct = lazy(() => import('./pages/products/addProduct'));
const Categories = lazy(() => import('./pages/categories'));

import Loader from './components/shared/Loader';
import store from './redux';

// Set base URL for API calls
HttpHelpers.setBaseUrl(import.meta.env.VITE_API_URL);

function App() {

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ThemeConfig>
          <CssBaseline />
          <ToastContainer
            autoClose={4000}
            transition={Slide}
            position={'top-left'}
            theme='colored'
            hideProgressBar
            style={{ width: '400px', height: 'fit-content' }}
          />
          <Suspense fallback={<Loader />}>
            <Routes>
              {/* Private Routes */}
              <Route path="/" element={<PrivateRoute />}>
                <Route index element={<Home />} />
                <Route path='/categories' element={<Categories />} />
                <Route path='/products' element={<Products />} />
                <Route path='/products/:id' element={<ProductDetails />} />
                <Route path='/products/add' element={<AddProduct />} />
              </Route>

              {/* Public Routes */}
              <Route path="/login" element={<PublicRoute />}>
                <Route index element={<Login />} />
              </Route>

            </Routes>
          </Suspense>
        </ThemeConfig>
      </QueryClientProvider>
    </Provider>
  )
}

export default App
