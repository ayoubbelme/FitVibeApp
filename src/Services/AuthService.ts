import apiRequest from './api';

export type SignUpPayload = {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  account_type: string;
  age: number;
  gender: string;
};

export type SignInPayload = {
  username: string;
  password: string;
};

export type User = {
  _id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  account_type: string;
  age: number;
  gender: string;
};

const AuthService = {
  signUp: (payload: SignUpPayload) =>
    apiRequest<User>('/auth/sign_up', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  signIn: (payload: SignInPayload) =>
    apiRequest<User>('/auth/sign_in', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  signOut: () =>
    apiRequest<null>('/auth/sign_out', {
      method: 'POST',
    }),

  currentUser: () => apiRequest<User>('/auth/current_user'),
};

export default AuthService;