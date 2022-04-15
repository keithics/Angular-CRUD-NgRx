import { createFeature, createReducer, on } from '@ngrx/store';
import { ModalDeleteInterface } from './modal-delete.interface';
import { modalDelete, modalDeleteCancel } from './modal-delete.actions';

const initialState: ModalDeleteInterface = {
  message: null,
  isDeleting: false,
  id: null,
};

export const name = 'modalDelete';

export const modalDeleteFeature = createFeature({
  name,
  reducer: createReducer(
    initialState,
    on(modalDelete, (state, { message, isDeleting, id }) => ({
      message,
      isDeleting,
      id,
    })),
    on(modalDeleteCancel, (state) => ({
      ...state,
      isDeleting: false,
    }))
  ),
});

export const { selectIsDeleting, selectMessage, selectId } = modalDeleteFeature;
