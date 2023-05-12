import { Middleware } from 'redux';
import { RootState } from './store';

// export const loggerMiddleware: Middleware<
//   {}, // Most middleware do not modify the dispatch return value
//   RootState
// > = (store) => (nextDispatch) => (action) => {
//   // console.log('dispatching', action);
//   let result = nextDispatch(action);
//   // console.log('next state', store.getState());
//   return result;
// };

// 製作 存進 localStorage的 Middlware 好像也可以使用 redux-persist 但會報錯
// https://stackoverflow.com/questions/68421040/local-storage-using-redux-toolkit

// export const authMiddleware: Middleware<{}, RootState> = (store) => (nextDispatch) => (action) => {
//   if (authActions.login.match(action)) {
//     // Note: localStorage expects a string
//     localStorage.setItem('isAuthenticated', 'true');
//   } else if (authActions.logout.match(action)) {
//     localStorage.setItem('isAuthenticated', 'false');
//   }
//   return nextDispatch(action);
// };
