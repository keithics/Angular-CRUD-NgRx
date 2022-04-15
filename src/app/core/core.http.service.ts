import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { requestFailure, validationError } from '../request/request.actions';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

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
    private router: Router,
    private authService: AuthService,
    private store: Store // private http: HttpClient
  ) {}

  get httpOptions(): { headers: HttpHeaders } {
    return this.coreHttpOptions;
  }

  get httpUploadOptions(): { headers: HttpHeaders } {
    return {
      headers: new HttpHeaders({
        'API-Version': '1',
        mode: 'no-cors',
      }),
    };
  }

  handleError(response: HttpErrorResponse) {
    if (response.status === 422) {
      this.store.dispatch(validationError({ message: response.error.message }));
    } else if (response.status === 401) {
      this.authService.logout();
      this.router.navigateByUrl('/');
    } else {
      this.store.dispatch(requestFailure());
    }

    return throwError(response);
  }
}
