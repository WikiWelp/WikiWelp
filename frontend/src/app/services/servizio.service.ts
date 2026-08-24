import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  private login: boolean = false;
  private register: boolean = false;
  private justLoggedIn: boolean = false;

  setLogin(status: boolean) {
    this.login = status;
    if (status) {
      this.justLoggedIn = true;
    }
  }

  isLoggedIn(): boolean {
    return this.login;
  }

  consumeJustLoggedIn(): boolean {
    if (this.justLoggedIn) {
      this.justLoggedIn = false;
      return true;
    }
    return false;
  }

  setRegister(status: boolean) {
    this.register = status;
  }

  isRegisterIn(): boolean {
    return this.register;
  }

  constructor() {}
}
