import request from '@utils/request';

interface LoginBody {
  phone: string;
  password: string;
}
export function login(body: LoginBody) {
  return request.post('/auth/login', body);
}
