import request from '@utils/request';

interface LoginBody {
  phone: string;
  password: string;
}
export function login(body: LoginBody): Promise<Response> {
  return request.post('/auth/login', body);
}
