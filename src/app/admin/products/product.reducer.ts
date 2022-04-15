import { createFeature, createReducer, on } from '@ngrx/store';
import { ProductPageInterface } from './product.interface';
import {
  productDelete,
  productsLoad,
  productsLoadSuccess,
} from './products.action';

const initialState: ProductPageInterface = {
  docs: [],
  totalDocs: 0,
};

export const name = 'products';

export const productFeature = createFeature({
  name,
  reducer: createReducer(
    initialState,
    on(productsLoad, (state) => ({
      ...state,
    })),
    on(productsLoadSuccess, (state, data) => ({
      ...state,
      ...data,
    })),
    on(productDelete, (state, { id }) => ({
      ...state,
      docs: state.docs.filter((d) => d._id != id),
    }))
  ),
});

export const { selectDocs, selectTotalDocs, selectProductsState } =
  productFeature;
