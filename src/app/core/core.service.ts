import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { CoreHttpService } from './core.http.service';
import { BaseInterface } from './core.interface';
import { Store } from '@ngrx/store';
import {
  requestInProgress,
  requestUploading,
  resetRequest,
} from '../request/request.actions';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  public urlPlural: string = '';
  public urlSingular: string = '';
  public api: string = '';
  public uploadApi: string = environment.hosts.upload;

  constructor(
    public http: HttpClient,
    public coreService: CoreHttpService,
    protected store: Store
  ) {}

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
        catchError((err) => of(this.coreService.handleError(err)))
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
        catchError((err) => of(this.coreService.handleError(err)))
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
        catchError((err) => of(this.coreService.handleError(err)))
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
        catchError((err) => of(this.coreService.handleError(err)))
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
        catchError((err) => of(this.coreService.handleError(err)))
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
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  upload(data: unknown): Observable<any> {
    this.store.dispatch(requestUploading());
    return this.http
      .post<any>(this.uploadApi, data, this.coreService.httpUploadOptions)
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }
}
