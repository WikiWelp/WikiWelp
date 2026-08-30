import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  private login: boolean = false;
  private register: boolean = false;
  private justLoggedIn: boolean = false;
  private darkMode: boolean = false;
  private email: string = '';

  setLogin(status: boolean, email: string) {
    this.login = status;
    this.email = email;
    if (status) {
      this.justLoggedIn = true;
    }
  }

  getEmail(): string {
    return this.email;
  }

  setEmail(email: string) {
    this.email = email;
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

  isDarkMode(): boolean {
    return this.darkMode;
  }

  setDarkMode(status: boolean) {
    this.darkMode = status;
  }

  constructor() {}
}
