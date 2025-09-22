import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.css'
})
export class FooterSectionComponent {
  actualYear = new Date().getFullYear();

}
