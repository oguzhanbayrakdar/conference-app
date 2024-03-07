import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConferenceComponent } from './conference.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConferenceService } from '../../services/conference.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { SidebarModule } from 'primeng/sidebar';
import { ConferenceFormComponent } from './conference-form/conference-form.component';

@NgModule({
  declarations: [
		ConferenceComponent,
		
	],
	exports: [ConferenceComponent],
  imports: [
		ConferenceFormComponent,
    CommonModule,
		ButtonModule,
		TableModule,
		DynamicDialogModule,
		ConfirmDialogModule,
		ToastModule,
		SidebarModule
  ],
	providers:[
		ConferenceService,
		ConfirmationService,
		MessageService,
		DialogService
	]
})
export class ConferenceModule { }
