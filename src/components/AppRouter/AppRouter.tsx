import React, { memo, useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import Layout from '../Layout/Layout';
import HomePage from '../../pages/HomePage/HomePage';
import CatalogPage from '../../pages/CatalogPage/CatalogPage';
import CollectionsPage from '../../pages/CollectionsPage/CollectionsPage'
import ProductPage from '../../pages/ProductPage/ProductPage';
import CollectionPage from '../../pages/CollectionPage/CollectionPage';
import SignInPage from '../../pages/Authorization/SignInPage';
import NoPage from '../../pages/NoPage/NoPage';
import SignUpPage from '../../pages/Authorization/SignUpPage';
import DashboardPage from '../../pages/DashboardPage/DashboardPage';
import ProfilePage from '../../pages/ProfilePage/ProfilePage';
import ProductCreationPage from '../../pages/ProductCreationPage/ProductCreationPage';
import CollectionCreationPage from '../../pages/CollectionCreationPage/CollectionCreationPage';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';
import { checkUserSession } from '../../app/reducers/authSlice';
import AdminProtectedRoute from './AdminProtectedRoute/AdminProtectedRoute';
import FavouritesPage from '../../pages/FavouritesPage/FavouritesPage';
import SharedFavouritesPage from '../../pages/SharedFavouritesPage/SharedFavouritesPage';
import { updateFromURL } from '../../app/reducers/catalogSlice';
import ArticlePage from '../../pages/ArticlePage/ArticlePage';
import Loader from '../Loader/Loader';
import { useTranslation } from 'react-i18next';
import ArticlesPage from '../../pages/ArticlesPage/ArticlesPage';

const AppRouter = memo(() => {
  const auth = useSelector((state: RootState) => state.auth);
  const isUserLoggedIn = Boolean(auth.token);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(updateFromURL(location.search));
    dispatch(checkUserSession())
      .then(() => setIsChecking(false))
      .catch(() => setIsChecking(false));
  }, [dispatch, location.search]);

  if (isChecking) {
    return <Loader text={t('Loading')}/>; // Или любой другой компонент загрузки
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<ProtectedRoute isAllowed={isUserLoggedIn} redirectPath="/signin" children={<DashboardPage />} />}>
            <Route path="profile" element={<ProfilePage />} />
            <Route path="favourites" element={<FavouritesPage />} />
            <Route path="products" element={<AdminProtectedRoute />}>
              <Route index element={<ProductCreationPage />} />
            </Route>
            <Route path="collections" element={<AdminProtectedRoute />}>
              <Route index element={<CollectionCreationPage />} />
            </Route>
          </Route>
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/collections/:id" element={<CollectionPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticlePage />} />
          <Route path="/favourites/:userId" element={<SharedFavouritesPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </>
  );
});

export default AppRouter;