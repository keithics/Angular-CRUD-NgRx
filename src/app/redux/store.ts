import { ActionReducerMap } from '@ngrx/store';
import { RequestInterface } from '../request/request.interface';
import { requestFeature } from '../request/request.reducer';
import { modalDeleteFeature } from '../modal/delete/modal-delete.reducer';
import { ModalDeleteInterface } from '../modal/delete/modal-delete.interface';
import { productFeature } from '../admin/products/product.reducer';
import { ProductPageInterface } from '../admin/products/product.interface';

interface AppState {
  requests: RequestInterface;
  modalDelete: ModalDeleteInterface;
  products: ProductPageInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  requests: requestFeature.reducer,
  modalDelete: modalDeleteFeature.reducer,
  products: productFeature.reducer,
};
