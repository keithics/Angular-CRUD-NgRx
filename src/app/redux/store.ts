import { ActionReducerMap } from '@ngrx/store';
import { RequestInterface } from '../request/request.interface';
import { requestFeature } from '../request/request.reducer';

interface AppState {
  requests: RequestInterface;
}

export const reducers: ActionReducerMap<AppState> = {
  requests: requestFeature.reducer,
};
