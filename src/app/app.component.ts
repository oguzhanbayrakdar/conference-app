import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';
import { environment } from '../environment/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
		RouterOutlet,
		LoginComponent,
		RegisterComponent,
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'conference-app';
}
