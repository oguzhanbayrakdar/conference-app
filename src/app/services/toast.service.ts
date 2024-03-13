import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, catchError, of, tap } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ToastService {

	/**
	 *
	 */
	constructor(private messageService: MessageService) {

	}

	showToast(severity: string, summary: string, detail: string) {
		this.messageService.add({ severity, summary, detail });
	}

	showGenericErrorToast() {
		this.showToast('error', 'Error', 'Bir hata oluştu.');
	}
	showGenericSuccessToast() {
		this.showToast('success', 'Başarılı', 'İşlem başarılı.');
	}


	handleGenericToastMessages<T>() {
		return (source: Observable<T>): Observable<T> => {
			return source.pipe(
				tap(() => this.showGenericSuccessToast()),
				catchError((err: any) => {
					this.showGenericErrorToast();
					throw err;
				})
			);
		};
	}

}