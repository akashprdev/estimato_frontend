import { api } from '@/services/network/network';
import { useMutation } from '@tanstack/react-query';

interface SignInRequest {
  email: string;
  password: string;
}

export interface User {
  id?: string;
  email: string;
  name: string;
}

export interface SignInResponse {
  user: User;
  token: string;
}

const signInAction = async ({
  email,
  password,
}: SignInRequest): Promise<SignInResponse> => {
  const { data } = await api.post('/v1/auth/login', {
    email,
    password,
  });
  console.log(data);

  return data.data;
};

export const useLogInMutation = () =>
  useMutation({
    mutationFn: signInAction,
  });
