import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './login/login.component';
import { GuestRoutingModule } from './guest-routing.module';
import { ValidationComponent } from '../alert/validation/validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoginComponent, ValidationComponent],
  imports: [CommonModule, GuestRoutingModule, ReactiveFormsModule, FormsModule],
})
export class GuestModule {}
