import { BaseInterface } from '../../core/core.interface';

export interface LoginInterface extends BaseInterface {
  email: string;
  password: string;
}
