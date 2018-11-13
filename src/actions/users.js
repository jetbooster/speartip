import api from '../api';
import { userLoggedIn } from './auth';
// eslint-disable-next-line import/prefer-default-export
export const signup = data => dispatch =>
  api.user.signup(data).then((user) => {
    localStorage.bookwormJWT = user.token;
    dispatch(userLoggedIn(user));
  });
