import { UserInterface } from '../../admin/users/user.interface';

export interface JwtInterface {
  token: string;
}

export interface JwtDecodedInterface {
  iat: number;
  user: UserInterface;
}
