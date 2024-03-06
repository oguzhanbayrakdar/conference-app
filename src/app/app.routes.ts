import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { RegisterComponent } from './account/register/register.component';

export const routes: Routes = [
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
	}
	
];
