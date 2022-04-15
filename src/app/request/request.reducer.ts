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
  requestUploading,
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
  isUploading: false, // shows a blocking modal when uploading
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
    on(requestUploading, (state) => ({
      ...initialState,
      isUploading: true,
    })),
    on(requestFailure, (state) => ({
      ...initialState,
      isFailure: true,
      message: 'An error occurred while requesting the API.',
    })),
    on(validationError, (state, { message }) => ({
      ...initialState,
      isValidationError: true,
      message,
    })),
    on(saveSuccess, (state, { message, title }) => ({
      ...initialState,
      saveSuccess: true,
      message,
      title,
    })),
    on(deleteSuccess, (state) => ({
      ...initialState,
      deletedSuccess: true,
    })),
    on(invalidToken, (state) => ({
      ...initialState,
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
  selectIsUploading,
  selectIsInvalidToken,
} = requestFeature;
