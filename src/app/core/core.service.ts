import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { CoreHttpService } from './core.http.service';
import { BaseInterface } from './core.interface';
import { Store } from '@ngrx/store';
import { requestInProgress, validationError } from '../request/request.actions';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public urlPlural: string = '';
  public urlSingular: string = '';
  public api: string = '';

  constructor(
    public http: HttpClient,
    public coreService: CoreHttpService,
    protected store: Store
  ) {}

  list(): Observable<any[]> {
    this.store.dispatch(requestInProgress());
    return this.http
      .get<BaseInterface[]>(
        this.api + this.urlPlural,
        this.coreService.httpOptions
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.coreService.handleError)
      );
  }

  paginate(data: unknown): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<unknown>(
        this.api + this.urlPlural + '/paginate',
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((datum) => console.log(datum)),
        catchError(this.coreService.handleError)
      );
  }

  count(): Observable<any[]> {
    this.store.dispatch(requestInProgress());
    return this.http
      .get<BaseInterface[]>(
        this.api + this.urlPlural + '/count',
        this.coreService.httpOptions
      )
      .pipe(
        tap((data) => console.log(data)),
        catchError(this.coreService.handleError)
      );
  }

  get(id: string): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .get<any>(
        this.api + this.urlSingular + '/' + id,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.coreService.handleError)
      );
  }

  post(data: BaseInterface): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<any>(
        this.api + this.urlSingular + '/',
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.coreService.handleError)
      );
  }

  update(id: string, data: BaseInterface): Observable<any> {
    this.store.dispatch(requestInProgress());
    console.log('UPDATE.....' + data);
    return this.http
      .put<any>(
        this.api + this.urlSingular + '/' + id,
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.coreService.handleError)
      );
  }

  add(data: unknown): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<any>(
        this.api + this.urlSingular + '/',
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.coreService.handleError)
      );
  }

  delete(id: string): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .delete<unknown>(
        this.api + this.urlSingular + '/' + id,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => console.log(response)),
        catchError(this.coreService.handleError)
      );
  }
}
