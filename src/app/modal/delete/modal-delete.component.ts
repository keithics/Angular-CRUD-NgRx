import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  selectId,
  selectIsDeleting,
  selectMessage,
} from './modal-delete.reducer';
import { modalDeleteCancel } from './modal-delete.actions';
import {
  productDelete,
  startDelete,
} from '../../admin/products/products.action';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent implements OnInit {
  isDeleting = this.store.select(selectIsDeleting);
  selectMessage = this.store.select(selectMessage);
  selectId = this.store.select(selectId);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}

  delete(id: string) {
    this.store.dispatch(startDelete({ id }));
  }

  cancel() {
    this.store.dispatch(modalDeleteCancel());
  }
}
