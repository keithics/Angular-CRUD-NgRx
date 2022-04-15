import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ModalUploadComponent } from '../modal/upload/modal-upload.component';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';
import { GuestModule } from '../guest/guest.module';
import { ModalDeleteComponent } from '../modal/delete/modal-delete.component';

@NgModule({
  declarations: [
    AdminComponent,
    ProductListComponent,
    ProductFormComponent,
    ModalUploadComponent,
    ModalDeleteComponent,
    SubmitButtonComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    GuestModule,
  ],
})
export class AdminModule {}
