import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ServizioService } from './services/servizio.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  title = 'Wiki';
  isDark = false;

  constructor(private servizio: ServizioService) {}

  toggleDarkMode() {
    this.isDark = !this.isDark;
    this.servizio.setDarkMode(this.isDark);
    document.body.classList.toggle('darkMode');
  }
}
