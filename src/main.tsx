import { GoogleOAuthProvider } from '@react-oauth/google'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App.tsx'
import './index.css'
import { setupAxiosInterceptors } from './service/AxiosInstant.ts'
import { logout } from './store/authSlice.ts'
import { store } from './store/store.ts'
const GG_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

setupAxiosInterceptors(store, logout);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId={GG_CLIENT_ID}>
      <App />
    </GoogleOAuthProvider>
  </Provider>
)
