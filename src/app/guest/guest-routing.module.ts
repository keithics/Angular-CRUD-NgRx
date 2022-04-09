import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { GuestGuard } from '../auth/guest.guard';

const guestRoutes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(guestRoutes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
