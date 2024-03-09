import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/internal/operators/tap';
import { RegisterDTO } from '../models/registerDTO';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) { }

	login(login: {email: string, password: string}){
		return this.http.post<any>(environment.apiUrl + '/account/login', login)
		.pipe(
			tap((data: {token: string, user: any}) => {
				if(data){
					localStorage.setItem('token', data.token);
				}
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
		
		return this.http.post(environment.apiUrl + '/account/register', formData);
	}

}
