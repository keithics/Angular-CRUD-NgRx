import * as moment from 'moment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginInterface } from '../guest/login/login.interface';
import {
  JwtDecodedInterface,
  JwtInterface,
} from '../guest/login/jwt.interface';
import { LoginService } from '../guest/login/login.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  redirectUrl: string = '/dashboard';
  constructor(private http: HttpClient, private loginService: LoginService) {}

  login(email: string, password: string) {
    const data = { email, password } as LoginInterface;
    return this.loginService.login(data);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('expires_at');
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

  setSession(authResult: JwtInterface) {
    const { user, iat } = this.getParsedJwt(
      authResult.token
    ) as JwtDecodedInterface;
    const expiresAt = moment().add(iat, 'second');
    localStorage.setItem('user', user.email);
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
  }

  getParsedJwt<T extends object = { [k: string]: string | number }>(
    token: string
  ): T | undefined {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch {
      return undefined;
    }
  }
}
