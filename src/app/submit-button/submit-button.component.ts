import { Component, OnInit } from '@angular/core';
import { selectIsLoading } from '../request/request.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css'],
})
export class SubmitButtonComponent implements OnInit {
  isLoading = this.store.select(selectIsLoading);

  constructor(private readonly store: Store) {}

  ngOnInit(): void {
    console.log(this.isLoading);
  }
}
