import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Conference } from '../models/conference';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {

  constructor(private http: HttpClient) { }

	getConferences(){
		return this.http.get<Conference[]>(environment.apiUrl + '/conference')
	}

	getConference(id: string){
		return this.http.get<Conference>(environment.apiUrl + '/conference/' + id)
	}

	create(conference: Conference){
		return this.http.post(environment.apiUrl + '/conference', conference)
	}

	update(conference: Conference){
		return this.http.put(environment.apiUrl + '/conference', conference);
	}

	delete(id: string){
		return this.http.delete(environment.apiUrl + '/conference/' + id)
	}
}
