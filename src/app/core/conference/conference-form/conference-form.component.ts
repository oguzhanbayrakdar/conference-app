import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import { ConferenceService } from '../../../services/conference.service';
import { UploadedFile } from '../../../models/uploadedFile';

@Component({
  selector: 'app-conference-form',
  standalone: true,
  imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputTextModule,
		FileUploadModule,
		CalendarModule,
		MultiSelectModule
	],
	providers: [ConferenceService],
  templateUrl: './conference-form.component.html',
  styleUrl: './conference-form.component.scss'
})
export class ConferenceFormComponent implements OnInit{
	type: 'create' | 'edit' = 'create';
	uploadedFiles: any[] = []
	_uploadedFiles: UploadedFile[] = [];

	conferenceForm = new FormGroup({
		name: new FormControl(''),
		start: new FormControl(new Date()),
		end: new FormControl(new Date()),
		description: new FormControl(''),


	})

	constructor(private formBuilder: FormBuilder, private conferenceService: ConferenceService) {}

	ngOnInit(): void {
		this.conferenceForm = this.formBuilder.group({
			name: ['', Validators.required],
			start: [new Date(), Validators.required],
			end: [new Date(), Validators.required],
			description: ['', Validators.required]
		})
	}

	onSelect(event: any){
		this._uploadedFiles = event.currentFiles.map((file: any) => {
			return {
				name: file.name,
				size: file.size,
				type: file.type,
			}
		})

	}

	save(){
		if(this.type === 'create'){

		}
	}

}
