import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  constructor(private http: HttpClient) { }

	login(login: {email: string, password: string}){
		return this.http.post<any>(environment.apiUrl + '/account/login', login)
		.pipe(
			tap((data: {token: string, result: boolean}) => {
				if(data.result){
					localStorage.setItem('token', data.token);		
				}
			})
		);
	}

	register(register: Register){
		return this.http.post(environment.apiUrl + '/account/register', register);
	}

}

export interface Register {
	firstname: string
	lastname: string
	email: string
	phone: string
	password: string
	photo: string
}
