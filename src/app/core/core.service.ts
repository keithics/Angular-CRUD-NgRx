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
  public moduleName: string = '';
  public api: string = '';
  public uploadApi: string = environment.hosts.upload;

  constructor(
    public http: HttpClient,
    public coreService: CoreHttpService,
    protected store: Store
  ) {}

  paginate(data: unknown): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http.post<unknown>(
      `${this.api}/${this.moduleName}/page`,
      data,
      this.coreService.httpOptions
    );
  }

  get(id: string): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .get<any>(
        `${this.api}/${this.moduleName}/${id}`,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  post(data: BaseInterface): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<any>(
        `${this.api}/${this.moduleName}/`,
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  update(id: string, data: BaseInterface): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .put<any>(
        `${this.api}/${this.moduleName}/${id}`,
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  add(data: unknown): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .post<any>(
        `${this.api}/${this.moduleName}/`,
        data,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  delete(id: string): Observable<any> {
    this.store.dispatch(requestInProgress());
    return this.http
      .delete<unknown>(
        `${this.api}/${this.moduleName}/${id}`,
        this.coreService.httpOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }

  upload(data: unknown, type: string): Observable<any> {
    this.store.dispatch(requestUploading());
    return this.http
      .post<any>(
        `${this.uploadApi}/${type}`,
        data,
        this.coreService.httpUploadOptions
      )
      .pipe(
        tap((response) => {
          this.store.dispatch(resetRequest());
        }),
        catchError((err) => of(this.coreService.handleError(err)))
      );
  }
}
