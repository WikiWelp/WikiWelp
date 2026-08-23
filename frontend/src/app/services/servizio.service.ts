import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  private login: boolean = false;
  private register: boolean = false;

  setLogin(status: boolean) {
    this.login = status;
  }

  isLoggedIn(): boolean {
    return this.login;
  }

  setRegister(status: boolean) {
    this.register = status;
  }

  isRegisterIn(): boolean {
    return this.register;
  }

  constructor() {}
}
