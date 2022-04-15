import { Component, OnInit } from '@angular/core';
import { selectIsLoading, selectIsUploading } from '../request/request.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  isUploading = this.store.select(selectIsUploading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
