import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConferenceService } from '../../../services/conference.service';
import { ConferenceDTO } from '../../../models/conferenceDTO';
import { Conference } from '../../../models/conference';
import { UploadedFile } from '../../../models/uploadedFile';
import { UploadedFileService } from '../../../services/uploaded-file.service';

@Component({
  selector: 'app-conference-form',
  templateUrl: './conference-form.component.html',
  styleUrl: './conference-form.component.scss'
})
export class ConferenceFormComponent implements OnInit{
	@Input() type: 'create' | 'edit' = 'create';
	@Input() conference?: Conference;
	@Output() newConference = new EventEmitter<Conference>()

	uploadedFiles: any[] = []
	oldUploadedFiles: UploadedFile[] = [];
	files: File[] = [];

	conferenceForm = new FormGroup({
		name: new FormControl(''),
		start: new FormControl(new Date()),
		end: new FormControl(new Date()),
		description: new FormControl(''),
	})

	constructor(private formBuilder: FormBuilder, private conferenceService: ConferenceService, private uploadFileService: UploadedFileService) {}

	ngOnInit(): void {
		this.conferenceForm = this.formBuilder.group({
			name: [this.conference ? this.conference.name : '', Validators.required],
			start: [this.conference ? new Date(this.conference.start) : new Date(), Validators.required],
			end: [this.conference ? new Date(this.conference.end) : new Date(), Validators.required],
			description: [this.conference && this.conference.description ? this.conference.description : '', Validators.required]
		})
		this.oldUploadedFiles = this.conference && this.conference.files ? this.conference.files : []
	}

	onSelect(event: any){
		this.files = event.currentFiles;
	}

	save(){
		if(!this.conferenceForm.valid)return;
		
		const conferenceDto: ConferenceDTO = {
			id: this.conference && this.conference.id ? this.conference.id : undefined,
			name: this.conferenceForm.value.name as string,
			start: this.conferenceForm.value.start as Date,
			end: this.conferenceForm.value.end as Date,
			description: this.conferenceForm.value.name as string,
			files: this.files
		}
		if(this.type === 'edit'){
			this.conferenceService.update(conferenceDto).subscribe((conference) => {
				this.newConference.emit(conference)
				if(conference.files)this.oldUploadedFiles.push(...conference.files)
			})
		}else{
			this.conferenceService.create(conferenceDto).subscribe((conference) => {
				this.newConference.emit(conference)
			});
		}

	}

	deleteOldFile(file: UploadedFile){
		const index = this.oldUploadedFiles.findIndex(f => f.id == file.id);
		if(index != -1){
			this.oldUploadedFiles.splice(index, 1);
			this.uploadFileService.deleteUploadedFile(file.id).subscribe();
		}
	}

}
