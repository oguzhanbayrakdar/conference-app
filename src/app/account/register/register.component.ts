import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import Validation from '../../utils/Validation';
import { AccountService } from '../../services/account.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';

@Component({
	selector: 'app-register',
	standalone: true,
	imports: [
		FormsModule,
		ReactiveFormsModule,
		ButtonModule,
		InputGroupModule,
		InputGroupAddonModule,
		InputTextModule,
		FileUploadModule
	],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
	submitted = false;
	registerForm = new FormGroup({
		firstname: new FormControl(''),
		lastname: new FormControl(''),
		email: new FormControl(''),
		phone: new FormControl(''),
		photo: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
	})

	constructor(private formBuilder: FormBuilder, private accountService: AccountService) { }

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			firstname: ['', [Validators.required]],
			lastname: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			phone: ['', [Validators.required]],
			photo: ['',[Validators.required]],
			password: ['', [Validators.required]],
			confirmPassword: ['', [Validators.required]]
		},
		{
			validators: [Validation.match('password', 'confirmPassword')]
		})
	}

	get f(): { [key: string]: AbstractControl } {
		return this.registerForm.controls;
	}

	register() {
		this.submitted = true

		if(this.registerForm.invalid) return;
		
		const formData: any = this.registerForm.value
		this.accountService.register(formData).subscribe()
	}

	onProfilePhotoUpload(event: FileUploadEvent){
		console.log(event)
	}
}
