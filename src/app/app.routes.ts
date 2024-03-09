import { Routes } from '@angular/router';
import { LoginComponent } from './core/account/login/login.component';
import { RegisterComponent } from './core/account/register/register.component';
import { ConferenceComponent } from './core/conference/conference.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';

export const routes: Routes = [
	{
		path: '',
		redirectTo: 'conference',
		pathMatch: 'full'
	},
	{
		path:'account',
		redirectTo: '/',
		pathMatch: 'full'
	},
	{
		path: 'account',
		children: [
			{
				path: 'login',
				component: LoginComponent
			},
			{
				path: 'register',
				component:RegisterComponent
			}
		]
	},
	// Eğer kullanıcı login olmamışsa login sayfasına yönlendir. Aksi takdirde conference sayfasına gitsin.
	{
		path: 'conference',
		component: ConferenceComponent,
		canActivate: [isLoggedInGuard]
	}
	
];
