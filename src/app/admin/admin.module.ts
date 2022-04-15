import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalComponent } from '../modal/modal.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductListComponent,
    ProductFormComponent,
    ModalComponent,
    SubmitButtonComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
  ],
})
export class AdminModule {}
