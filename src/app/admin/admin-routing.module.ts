import { AdminComponent } from './admin/admin.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../auth/auth.guard';
import { ProductListComponent } from './products/product-list/product-list.component';
import { ProductFormComponent } from './products/product-form/product-form.component';
import { NotfoundComponent } from '../notfound/notfound.component';

const adminRoutes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        children: [
          { path: 'product', component: ProductFormComponent },
          { path: 'product/:id', component: ProductFormComponent },
          { path: 'products', component: ProductListComponent },
          { path: '', redirectTo: 'products', pathMatch: 'full' },
          { path: '**', component: NotfoundComponent },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(adminRoutes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
