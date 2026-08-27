import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { ServizioService } from './services/servizio.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Wiki';
  private http = inject(HttpClient);
  private servizio=inject(ServizioService)
  private baseUrl = environment.apiUrl;

  isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.servizio.setDarkMode(this.isDark);
    document.body.classList.toggle('darkMode');
  }
}
