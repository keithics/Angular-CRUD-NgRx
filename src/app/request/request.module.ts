import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { requestFeature } from './request.reducer';

@NgModule({
  imports: [StoreModule.forFeature(requestFeature)],
})
export class BooksModule {}
