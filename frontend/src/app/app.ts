import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

interface UserDAO {
  id: number;
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  protected pingResult = signal('');

  protected userCreateEmail = '';
  protected userCreatePassword = '';
  protected createUserResult = signal('');

  protected userFindEmail = '';
  protected findUserResult = signal('');

  constructor() {
    this.http.get(`${this.baseUrl}/api/ping`, { responseType: 'text' })
      .subscribe({
        next: (text) => this.pingResult.set(text),
        error: () => this.pingResult.set('error')
      });
  }

  protected createUser() {
    const user: UserDAO = { id: 0, email: this.userCreateEmail, password: this.userCreatePassword};
    this.http.post<UserDAO>(`${this.baseUrl}/api/user/create`, user)
      .subscribe({
        next: () => this.createUserResult.set('User created!'),
        error: (e) => this.createUserResult.set(e.status)
      });
  }

  protected findUser() {
    this.http.get<UserDAO>(`${this.baseUrl}/api/user/${this.userFindEmail}`)
      .subscribe({
        next: (u) => this.findUserResult.set(`ID: ${u.id}, Email: ${u.email}, Password: ${u.password}`),
        error: (e) => this.findUserResult.set(e.status)
      });
  }
}
