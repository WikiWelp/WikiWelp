import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServizioService {
  login = false;
  register = false;
  justLoggedIn = false;
  darkMode = false;
  email = '';
  admin = false;

  setLogin(status: boolean, email = '', admin = false) {
    this.login = status;
    this.email = email;
    this.admin = admin;
    if (status) this.justLoggedIn = true;
  }

  isLoggedIn() {
    return this.login;
  }

  isAdmin() {
    return this.admin;
  }

  getEmail() {
    return this.email;
  }

  isDarkMode() {
    return this.darkMode;
  }

  setDarkMode(status: boolean) {
    this.darkMode = status;
  }

  setRegister(status: boolean) {
    this.register = status;
  }

  isRegisterIn() {
    return this.register;
  }

  consumeJustLoggedIn() {
    const res = this.justLoggedIn;
    this.justLoggedIn = false;
    return res;
  }
}
