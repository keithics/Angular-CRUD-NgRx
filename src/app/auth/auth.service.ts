import { Injectable } from '@angular/core';
import {
  JwtDecodedInterface,
  JwtInterface,
} from '../guest/login/jwt.interface';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  redirectUrl: string = '/dashboard';
  constructor(private cookieService: CookieService) {}

  logout() {
    this.cookieService.deleteAll();
  }

  public isLoggedIn() {
    const expiration = this.getExpiration()
      ? this.getExpiration() * 1000
      : Date.now() - 1000;
    return Date.now() < expiration;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = this.cookieService.get('expires_at') || null;
    return JSON.parse(expiration!);
  }

  setCookie(key: string, value: string) {
    this.cookieService.set(key, value, {
      secure: true,
      sameSite: 'Strict',
      path: '/',
    });
  }

  setSession(authResult: JwtInterface) {
    const { user, exp } = this.getParsedJwt(
      authResult.token
    ) as JwtDecodedInterface;
    this.setCookie('user', user.email);
    this.setCookie('expires_at', JSON.stringify(exp));
    this.setCookie('token', authResult.token); //TODO token is invalid in server
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
