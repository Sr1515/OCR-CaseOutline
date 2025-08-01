import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { AuthProviderContext } from './context/AuthProvider';
import AppRoutes from './routes/AppRoutes';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProviderContext>
        <AppRoutes />
      </AuthProviderContext>
    </BrowserRouter>
  </StrictMode>
);
