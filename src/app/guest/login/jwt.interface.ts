import { UserInterface } from '../../admin/users/user.interface';

export interface JwtInterface {
  token: string;
}

export interface JwtDecodedInterface {
  exp: number;
  user: UserInterface;
}
