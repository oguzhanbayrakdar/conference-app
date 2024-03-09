import { Component, OnInit } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference'
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConferenceFormComponent } from './conference-form/conference-form.component';
import { UploadedFile } from '../../models/uploadedFile';

@Component({
	selector: 'app-conference',
	templateUrl: './conference.component.html',
	styleUrl: './conference.component.scss'
})

export class ConferenceComponent implements OnInit {
	conferences: Conference[] = [];
	isConferenceFormOpen = false;
	conferenceFormType: 'edit' | 'create' = 'create';
	selectedConferenceToEdit?: Conference;

	constructor(
		private conferenceService: ConferenceService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
		) { }

	ngOnInit(): void {
		this.conferenceService.getConferences().subscribe(conferences => {
			this.conferences = conferences
		})
	}

	deleteConference(id: string) {
		this.confirmationService.confirm({
			message: 'Bu toplantıyı silmek istediğinizden emin misiniz?',
			header: 'Sil İşlemi',
			icon: 'pi pi-info-circle',
			acceptButtonStyleClass: "p-button-danger p-button-text",
			rejectButtonStyleClass: "p-button-text p-button-text",
			acceptIcon: "none",
			rejectIcon: "none",
			accept: () => {
				this.conferenceService.delete(id).subscribe(
				() => {
					let index = this.conferences.findIndex(f => f.id === id);
					this.conferences.splice(index, 1);

					this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
				});
			},
			reject: () => {
				this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
			}
		});
	}

	editConference(conference: Conference) {
		this.conferenceFormType = 'edit'
		this.isConferenceFormOpen = !this.isConferenceFormOpen
		this.selectedConferenceToEdit = conference
	}

	openCreateConferenceSidebar(){
		this.conferenceFormType = 'create'
		this.isConferenceFormOpen = !this.isConferenceFormOpen
		this.selectedConferenceToEdit = undefined
	}

	getConferenceFormData(conference: Conference){
		if(this.conferenceFormType == 'create'){
			this.conferences.unshift(conference)
		}else{
			let index = this.conferences.findIndex(f => f.id == conference.id);
			if(index !== -1){
				const uploadedFiles: UploadedFile[] = [];
				if(this.conferences[index].files) uploadedFiles.push(...this.conferences[index].files || [])
				if(conference.files) uploadedFiles.push(...conference.files)
			
				Object.assign(this.conferences[index], conference);
				this.conferences[index].files = uploadedFiles;
			}
		}
		this.isConferenceFormOpen = false;
	}
}
