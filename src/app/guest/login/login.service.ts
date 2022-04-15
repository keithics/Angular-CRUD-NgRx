import { BaseService } from '../../core/core.service';
import { HttpClient } from '@angular/common/http';
import { CoreHttpService } from '../../core/core.http.service';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { BaseInterface } from '../../core/core.interface';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {
  requestInProgress,
  validationError,
} from '../../request/request.actions';
import { LoginInterface } from './login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService extends BaseService {
  public override api = environment.hosts.user;

  login(data: LoginInterface): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<any>(this.api + '/login', data, this.coreService.httpOptions)
      .pipe(
        tap((response) => console.log(response)),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }
}
