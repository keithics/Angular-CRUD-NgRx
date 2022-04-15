import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of, switchMap } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import {
  productDelete,
  productsLoad,
  productsLoadSuccess,
  startDelete,
} from './products.action';
import { ProductService } from './product.service';
import { modalDeleteCancel } from '../../modal/delete/modal-delete.actions';
import { CoreHttpService } from '../../core/core.http.service';

@Injectable()
export class ProductsEffects {
  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(productsLoad),
      mergeMap(() =>
        this.productService.paginate({ page: 1 }).pipe(
          switchMap((response) => [productsLoadSuccess(response)]),
          catchError((err) => {
            this.coreService.handleError(err);
            return EMPTY;
          })
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(startDelete),
      mergeMap((action) =>
        this.productService.delete(action.id).pipe(
          switchMap((response) => [
            productDelete({ id: action.id }),
            modalDeleteCancel(),
          ]),
          catchError(() => EMPTY)
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService,
    public coreService: CoreHttpService
  ) {}
}
