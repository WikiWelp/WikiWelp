import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule],

  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Wiki';
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  isDark = false;

  toggleDarkMode() {
    this.isDark = !this.isDark;
    document.body.classList.toggle('darkMode');
  }
}
