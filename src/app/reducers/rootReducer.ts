import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../reducers/example/counterSlice';
import authReducer from './authSlice';
import userReducer from './userSlice';
import productReducer from './productsSlice';
import notificationReducer from './notificationSlice';
import userDashboardReducer from './userDashboardSlice';
import catalogCriteriaReducer from './catalogCriteriaSlice';
import collectionsReducer from './collectionsSlice';
import favouritesReducer from './favouritesSlice';
import catalogReducer from './catalogSlice';
import languageReducer from './languageSlice';
import currencyReducer from './currencySlice';
import menuReducer from './menuSlice';
import searchReducer from './searchSlice';
import articlesReducer from './articlesSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
  user: userReducer,
  products: productReducer,
  notification: notificationReducer,
  userDashboard: userDashboardReducer,
  catalogCriteria: catalogCriteriaReducer,
  collections: collectionsReducer,
  favourites: favouritesReducer,
  catalog: catalogReducer,
  language: languageReducer,
  currency: currencyReducer,
  menu: menuReducer,
  search: searchReducer,
  articles: articlesReducer
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;