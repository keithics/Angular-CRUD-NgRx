import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { reducers } from './redux/store';
import { GuestModule } from './guest/guest.module';
import { AuthInterceptor } from './core/core.http-interceptor.service';
import { CookieService } from 'ngx-cookie-service';
import { EffectsModule } from '@ngrx/effects';
import { ProductsEffects } from './admin/products/products.effects';

@NgModule({
  declarations: [AppComponent, NotfoundComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AdminModule,
    GuestModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([ProductsEffects]),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [
    AuthService,
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
