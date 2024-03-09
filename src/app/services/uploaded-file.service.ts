import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadedFileService {

  constructor(private http: HttpClient) { }

	deleteUploadedFile(id: string){
		return this.http.delete(environment.apiUrl + '/uploaded-file/' + id)
	}
}
