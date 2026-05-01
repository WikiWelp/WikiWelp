import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServizioService {
  private login: boolean = false;

  setLogin(status: boolean){
    this.login=status;
  }

  isLoggedIn(): boolean{
    return this.login
  }
  constructor() { }
}
