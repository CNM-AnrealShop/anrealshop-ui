import { createTheme, MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { lazy, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import './App.css';
import { APP_ROUTES } from './constant';
import { useAppDispatch, useAppSelector } from './hooks/useAppRedux';
import { connectWs, disconnectWs } from './service/websocketClient';
import { fetchCurrentUser } from './store/authSlice';

const AuthoPage = lazy(() => import('./pages/Auth/AuthoPage'));
const MyshopPage = lazy(() => import('./pages/MyshopPage/MyshopRoute'));
const AdminPage = lazy(() => import('./pages/MyshopPage/AdminRoute'));
const UserRoute = lazy(() => import('./pages/MyshopPage/UserRoute'));
const RegisterShopPage = lazy(() => import('./components/User/RegisterShopPage/RegisterShopPage'));

function App() {
  const theme = createTheme({
    primaryColor: 'blue',
    primaryShade: 5,
    colors: {
      blue: [
        '#f0faff',
        '#e0f5fe',
        '#bae8fd',
        '#7dd5fc',
        '#38bcf8',
        '#0ea5e9',
        '#028ac7',
        '#0370a1',
        '#075e85',
        '#0c506e',
        '#083549',
      ],
    },
    fontFamily: 'Inter var, ui-sans-serif, system-ui, sans-serif',
    defaultRadius: 'md',
    components: {
      Input: {
        styles: {
          root: { '&:focus': { borderColor: '#0ea5e9' } }
        },
      },
      Button: {
        defaultProps: {
          color: '#0ea5e9',
        },
      },
    },
  });

  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if (!user && !isAuthenticated) {
      dispatch(fetchCurrentUser());
    }
    if (user) {
      connectWs();
    }
    if (!user) {
      disconnectWs();
    }

    return () => {
      disconnectWs();
    };
  }, [user]);

  return (
    <MantineProvider theme={theme}>
      <Notifications position="bottom-right" zIndex={1000} />
      <BrowserRouter>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            <Routes>
              <Route path={APP_ROUTES.LOGIN} element={<AuthoPage />} />
              <Route path={APP_ROUTES.REGISTER} element={<AuthoPage />} />
              <Route path={APP_ROUTES.ADMIN.BASE} element={<AdminPage />} />
              <Route path={APP_ROUTES.SHOP_REGISTER} element={<RegisterShopPage />} />
              <Route path={APP_ROUTES.MYSHOP.BASE} element={<MyshopPage />} />
              <Route path="/*" element={<UserRoute />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;