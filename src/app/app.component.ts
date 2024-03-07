import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './core/account/login/login.component';
import { RegisterComponent } from './core/account/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { ConferenceModule } from './core/conference/conference.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
		RouterOutlet,
		HttpClientModule,
		LoginComponent,
		RegisterComponent,
		ConferenceModule
	],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'conference-app';
}
