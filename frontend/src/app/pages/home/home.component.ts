import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServizioService } from '../../services/servizio.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
            CommonModule,
            RouterModule
          ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public servizio: ServizioService) {}
}
