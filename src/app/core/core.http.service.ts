import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { validationError } from '../request/request.actions';

@Injectable({
  providedIn: 'root',
})
export class CoreHttpService {
  coreHttpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'API-Version': '1',
      mode: 'no-cors',
    }),
  };

  constructor(
    private store: Store // private http: HttpClient
  ) {}

  get httpOptions(): { headers: HttpHeaders } {
    return this.coreHttpOptions;
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 422) {
      this.store.dispatch(validationError({ message: response.error.message }));
    }
    return throwError(response);
  }
}
