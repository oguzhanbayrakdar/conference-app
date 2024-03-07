import { Component } from '@angular/core';
import { ConferenceService } from '../../services/conference.service';
import { Conference } from '../../models/conference'
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { ConferenceFormComponent } from './conference-form/conference-form.component';

@Component({
	selector: 'app-conference',
	templateUrl: './conference.component.html',
	styleUrl: './conference.component.scss'
})

export class ConferenceComponent {
	exampleData: Conference[] = [
		{
			id: "1",
			name: "Web Development Summit",
			start: new Date("2024-05-10T09:00:00"),
			end: new Date("2024-05-12T17:00:00"),
			description: "This summit covers the latest trends and technologies in web development.",
		},
		{
			id: "2",
			name: "Data Science Conference",
			start: new Date("2024-06-15T10:00:00"),
			end: new Date("2024-06-15T18:00:00"),
			description: "Explore the world of data science and machine learning at this conference."
		},
		{
			id: "3",
			name: "Mobile App Expo",
			start: new Date("2024-08-20T11:00:00"),
			end: new Date("2024-08-22T16:00:00"),
			description: "Discover the latest innovations in mobile app development."
		},
		{
			id: "4",
			name: "AI and Robotics Congress",
			start: new Date("2024-09-25T10:30:00"),
			end: new Date("2024-09-27T17:30:00"),
			description: "Join experts in artificial intelligence and robotics for insightful discussions."
		},
		{
			id: "5",
			name: "Cloud Computing Symposium",
			start: new Date("2024-10-30T09:30:00"),
			end: new Date("2024-10-30T16:30:00"),
			description: "Learn about the advancements in cloud computing technologies."
		},
		{
			id: "6",
			name: "Cybersecurity Summit",
			start: new Date("2024-12-05T10:15:00"),
			end: new Date("2024-12-07T17:15:00"),
			description: "Discuss cybersecurity challenges and solutions with industry leaders."
		},
		{
			id: "7",
			name: "Blockchain Conference",
			start: new Date("2025-01-20T09:45:00"),
			end: new Date("2025-01-22T16:45:00"),
			description: "Explore the potential of blockchain technology and its applications."
		},
		{
			id: "8",
			name: "IoT Expo",
			start: new Date("2025-03-15T10:45:00"),
			end: new Date("2025-03-15T17:45:00"),
			description: "Discover the Internet of Things (IoT) ecosystem at this expo."
		},
		{
			id: "9",
			name: "HealthTech Summit",
			start: new Date("2025-04-25T09:20:00"),
			end: new Date("2025-04-25T16:20:00"),
			description: "Explore the intersection of healthcare and technology."
		},
		{
			id: "10",
			name: "Fintech Forum",
			start: new Date("2025-06-10T10:20:00"),
			end: new Date("2025-06-12T17:20:00"),
			description: "Discuss the latest trends and innovations in financial technology."
		}
	];

	constructor(
		private conferenceService: ConferenceService,
		private confirmationService: ConfirmationService,
		private messageService: MessageService,
		private dialogService: DialogService) { 
			this.editConference(this.exampleData[0])
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
					this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
				});
			},
			reject: () => {
				this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
			}
		});
	}


	editConference(conference: Conference) {
		
	}
}


