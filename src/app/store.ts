// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from './reducers/rootReducer';

// const store = configureStore({
//   reducer: rootReducer,
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/rootReducer';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Игнорировать конкретные типы действий
        ignoredActions: ['modal/openModal'],
        // Игнорировать конкретные пути в состоянии
        ignoredPaths: ['modal.content', 'modal.onClose'], 
      },
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
