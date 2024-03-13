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
import { UploadedFileService } from '../../services/uploaded-file.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from '../../interceptors/token.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { FileUploadModule } from 'primeng/fileupload';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { ToastService } from '../../services/toast.service';

@NgModule({
  declarations: [
		ConferenceComponent,
		ConferenceFormComponent
	],
	exports: [ConferenceComponent],
  imports: [
    CommonModule,
		ButtonModule,
		TableModule,
		DynamicDialogModule,
		ConfirmDialogModule,
		ToastModule,
		SidebarModule,
		FormsModule,
		ReactiveFormsModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputTextModule,
		FileUploadModule,
		CalendarModule,
		MultiSelectModule
  ],
	providers:[
		ConferenceService,
		ConfirmationService,
		UploadedFileService,
		MessageService,
		DialogService,
		ToastService,
		{
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
	]
})
export class ConferenceModule { }
