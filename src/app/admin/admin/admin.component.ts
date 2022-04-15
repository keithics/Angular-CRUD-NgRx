import { Component, OnInit } from '@angular/core';
import {
  selectIsInvalidToken,
  selectIsLoading,
} from '../../request/request.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  isInvalidToken = this.store.select(selectIsInvalidToken);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    if (this.isInvalidToken) {
      console.log('invalid');
    }
  }
}
