import { Component } from '@angular/core';
import { checkIfMobile } from './shared/util';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'resto-mama-ui';
  isMobile = checkIfMobile();
}
