import React, { useEffect } from 'react';
import AppRouter from '../components/AppRouter/AppRouter';
import { BrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { validateToken } from '../app/reducers/authSlice';
import { AppDispatch } from '../app/store';
import NotificationCenter from '../components/NotificationCenter/NotificationCenter'; // Импортируйте ваш компонент здесь
import './App.module.css';
import { LayoutProvider } from '../components/Layout/LayoutContext/LayoutContext';

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(validateToken());
  }, [dispatch]);

  return (
    <LayoutProvider>
      <BrowserRouter>
        <NotificationCenter />
        <AppRouter />
      </BrowserRouter>
    </LayoutProvider>
  );
}

export default App;