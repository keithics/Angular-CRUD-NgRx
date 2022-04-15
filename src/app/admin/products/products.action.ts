import { createAction, props } from '@ngrx/store';

export const productsLoad = createAction(
  '[productsLoad Component] productsLoad'
);

export const productsLoadSuccess = createAction(
  '[productsLoadSuccess Component] productsLoadSuccess',
  props<{ docs: []; totalDocs: number }>()
);

export const startDelete = createAction(
  '[startDelete Component] startDelete',
  props<{ id: string }>()
);

export const productDelete = createAction(
  '[productDelete Component] productDelete',
  props<{ id: string }>()
);
