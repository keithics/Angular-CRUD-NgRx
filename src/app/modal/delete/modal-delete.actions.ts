import { createAction, props } from '@ngrx/store';
import { TypedAction } from '@ngrx/store/src/models';

export const modalDelete = createAction(
  '[modalDelete Component] modalDelete',
  props<{ message: string; isDeleting: boolean; id: string }>()
);

export const modalDeleteCancel = createAction(
  '[modalDeleteCancel Component] modalDeleteCancel'
);
