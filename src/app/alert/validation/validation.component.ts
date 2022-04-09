import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectMessage } from '../../request/request.reducer';

@Component({
  selector: 'app-validation-alert',
  templateUrl: './validation.html',
})
export class ValidationComponent {
  message = this.store.select(selectMessage);

  constructor(private store: Store) {}
}
