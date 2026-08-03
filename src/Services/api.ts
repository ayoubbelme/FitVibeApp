import { BASE_URL } from '../Constants/api';

type ApiResponse<T> = {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  errors?: string[];
};

async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
): Promise<ApiResponse<T>> {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: 'include', // required so the session cookie is stored and sent
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  const json = await response.json();
  return json as ApiResponse<T>;
}

export default apiRequest;