import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Conference } from '../models/conference';
import { ConferenceDTO } from '../models/conferenceDTO';
import { Observable, catchError } from 'rxjs';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class ConferenceService {
  constructor(private http: HttpClient, private toastService: ToastService) { }

	getConferences(){
		return this.http.get<Conference[]>(environment.apiUrl + '/conference').pipe(
			catchError((err: any) => {
				this.toastService.showToast('error', 'Error', 'Verileri alırken bir hata oluştu.');
				throw err;
			})
		)
	}

	create(conference: ConferenceDTO){
		const formData = new FormData();
		formData.append('name', conference.name)
		formData.append('start', conference.start.toLocaleString())
		formData.append('end', conference.end.toLocaleString())
		formData.append('description', conference.description || '')

		if(conference.files){
			for(let i = 0; i < conference.files?.length; i++){
				formData.append('files',conference.files[i]);
			}
		}
		return this.http.post<Conference>(environment.apiUrl + '/conference', formData).pipe(
			this.toastService.handleGenericToastMessages()
		)
	}

	update(conference: ConferenceDTO){
		const formData = new FormData();
		formData.append('name', conference.name)
		formData.append('start', conference.start.toLocaleString())
		formData.append('end', conference.end.toLocaleString())
		formData.append('description', conference.description || '')

		if(conference.files){
			for(let i = 0; i < conference.files?.length; i++){
				formData.append('files',conference.files[i]);
			}
		}

		return this.http.put<Conference>(environment.apiUrl + '/conference/' + conference.id, formData).pipe(
			this.toastService.handleGenericToastMessages()
		)
	}

	delete(id: string){
		return this.http.delete(environment.apiUrl + '/conference/' + id).pipe(
			this.toastService.handleGenericToastMessages()
		)
	}
}
