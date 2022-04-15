import { Component, OnInit } from '@angular/core';
import { selectIsUploading } from '../../request/request.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styleUrls: ['./modal-upload.component.css'],
})
export class ModalUploadComponent implements OnInit {
  isUploading = this.store.select(selectIsUploading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {}
}
