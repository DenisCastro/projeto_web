import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Credentials, CredentialsService } from './credentials.service';
import { HttpService } from '../http/http.service';
import { HttpHeaders } from '@angular/common/http';

export interface LoginContext {
  username: string;
  password: string;
  remember?: boolean;
}

var sha1 = require('sha1');
/**
 * Provides a base for authentication workflow.
 * The login/logout methods should be replaced with proper implementation.
 */
@Injectable()
export class AuthenticationService {
  constructor(private credentialsService: CredentialsService, private httpService: HttpService) {}

  /**
   * Authenticates the user.
   * @param context The login parameters.
   * @return The user credentials.
   */
  login(context: LoginContext): Observable<any> {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.set('username', context.username).set('password', sha1(context.password));
    return this.httpService.get('https://demo4967887.mockable.io/login/', {
      headers: headers
    });
  }

  setCredentials(data: Credentials, context: LoginContext): void {
    this.credentialsService.setCredentials(data, context.remember);
  }

  /**
   * Logs out the user and clear credentials.
   * @return True if the user was logged out successfully.
   */
  logout(): Observable<boolean> {
    // Customize credentials invalidation here
    this.credentialsService.setCredentials();
    return of(true);
  }
}
