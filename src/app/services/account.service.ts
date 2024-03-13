import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { RegisterDTO } from '../models/registerDTO';
import { catchError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient, private toastService: ToastService) { }

	login(login: {email: string, password: string}){
		return this.http.post<any>(environment.apiUrl + '/account/login', login)
		.pipe(
			tap((data: {token: string, user: any}) => {
				if(data){
					localStorage.setItem('token', data.token);
					this.toastService.showGenericSuccessToast();
				}
			}),
			catchError((error) => {
				this.toastService.showGenericErrorToast();
				throw error;
			})
		);
	}

	register(register: RegisterDTO, profilePhoto: File){
		const formData = new FormData();
		formData.append('firstname', register.firstname);
		formData.append('lastname', register.lastname);
		formData.append('email', register.email);
		formData.append('phone', register.phone);
		formData.append('password', register.password);
		formData.append('photoFile', profilePhoto);
		
		return this.http.post(environment.apiUrl + '/account/register', formData).pipe(
			this.toastService.handleGenericToastMessages()
		)
	}

}
