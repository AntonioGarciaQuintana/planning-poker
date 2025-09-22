import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './pages/header/header';
import { FooterSectionComponent } from './pages/footer/footer-section';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HeaderComponent, FooterSectionComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('planning-poker');
}
