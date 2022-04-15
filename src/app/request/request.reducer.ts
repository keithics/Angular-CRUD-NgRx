import {
  createFeature,
  createFeatureSelector,
  createReducer,
  createSelector,
  on,
} from '@ngrx/store';
import {
  deleteSuccess,
  invalidToken,
  requestFailure,
  requestInProgress,
  resetRequest,
  saveSuccess,
  validationError,
} from './request.actions';
import { RequestInterface } from './request.interface';

// learn more about ngrx store here
// https://ngrx.io/guide/store/feature-creators

const initialState: RequestInterface = {
  title: null,
  message: null,
  isFailure: false,
  isLoading: false,
  isValidationError: false,
  isClose: true,
  saveSuccess: false,
  deletedSuccess: false,
  isInvalidToken: false,
};

export const name = 'requests';

export const requestFeature = createFeature({
  name,
  reducer: createReducer(
    initialState,
    on(requestInProgress, (state) => ({
      ...initialState,
      isLoading: true,
    })),
    on(requestFailure, (state) => ({
      ...state,
      isFailure: true,
      message: 'An error occurred while requesting the API.',
    })),
    on(validationError, (state, { message }) => ({
      ...state,
      isValidationError: true,
      message,
    })),
    on(saveSuccess, (state, { message, title }) => ({
      ...state,
      saveSuccess: true,
      message,
      title,
    })),
    on(deleteSuccess, (state) => ({
      ...state,
      deletedSuccess: true,
    })),
    on(invalidToken, (state) => ({
      ...state,
      isInvalidToken: true,
    })),
    on(resetRequest, () => ({
      ...initialState,
    }))
  ),
});

export const {
  selectRequestsState,
  selectMessage,
  selectTitle,
  selectIsLoading,
  selectIsInvalidToken,
} = requestFeature;
