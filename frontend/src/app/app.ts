import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

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

  constructor() {
    this.http.get(`${this.baseUrl}/api/ping`, { responseType: 'text' })
      .subscribe({
        next: (text) => this.pingResult.set(text),
        error: () => this.pingResult.set('error')
      });
  }
}
