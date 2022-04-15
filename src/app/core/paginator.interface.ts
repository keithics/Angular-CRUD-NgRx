import { BaseInterface } from './core.interface';

export interface PaginatorInterface {
  docs: BaseInterface[];
  totalDocs: number;
}
