import { createAction, props } from '@ngrx/store';

export const requestInProgress = createAction(
  '[requestInProgress Component] requestInProgress'
);

export const requestFailure = createAction(
  '[requestFailure Component] requestFailure'
);

export const validationError = createAction(
  '[validationError Component] validationError',
  props<{ message: string }>()
);

export const saveSuccess = createAction(
  '[saveSuccess Component] saveSuccess',
  props<{ message: string; title: string }>()
);
export const deleteSuccess = createAction(
  '[deleteSuccess Component] deleteSuccess'
);

export const resetRequest = createAction(
  '[resetRequest Component] resetRequest'
);
