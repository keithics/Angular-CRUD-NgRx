import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { ProductInterface, ProductPageInterface } from '../product.interface';
import { Store } from '@ngrx/store';
import { modalDelete } from 'src/app/modal/delete/modal-delete.actions';
import { Observable } from 'rxjs';
import { selectDocs, selectProductsState } from '../product.reducer';
import { productsLoad } from '../products.action';
import { ProductsEffects } from '../products.effects';

@Component({
  selector: 'app-admin',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements OnInit {
  products$: Observable<ProductInterface[]> = this.store.select(selectDocs);

  constructor(
    private productsEffects: ProductsEffects,
    private service: ProductService,
    private router: Router,
    private readonly store: Store
  ) {}

  ngOnInit(): void {
    this.store.dispatch(productsLoad());
  }

  delete(id: string) {
    this.store.dispatch(
      modalDelete({
        message: 'Are you sure to delete this item? ',
        isDeleting: true,
        id,
      })
    );
  }
}
