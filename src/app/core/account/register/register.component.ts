import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import Validation from '../../../utils/Validation';
import { AccountService } from '../../../services/account.service';
import { FileUploadEvent, FileUploadModule } from 'primeng/fileupload';
import { Router, RouterModule } from '@angular/router';
import { RegisterDTO } from '../../../models/registerDTO';
import { MessageService } from 'primeng/api';

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
		FileUploadModule,
		RouterModule,
	],
	providers: [AccountService],
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
	submitted = false;
	selectedProfilePhoto: File | undefined = undefined;
	registerForm = new FormGroup({
		firstname: new FormControl(''),
		lastname: new FormControl(''),
		email: new FormControl(''),
		phone: new FormControl(''),
		password: new FormControl(''),
		confirmPassword: new FormControl(''),
	})

	constructor(private formBuilder: FormBuilder, private accountService: AccountService, private router: Router) { }

	ngOnInit(): void {
		this.registerForm = this.formBuilder.group({
			firstname: ['Oğuzhan', [Validators.required]],
			lastname: ['Bayrakdar', [Validators.required]],
			email: ['test1@test.com', [Validators.required, Validators.email]],
			phone: ['12321321', [Validators.required]],
			password: ['12345678', [Validators.required]],
			confirmPassword: ['12345678', [Validators.required]]
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
		
		// const formData: RegisterDTO = {
		// 	firstname: this.registerForm.value.firstname!,
		// 	lastname: this.registerForm.value.lastname!,
		// 	email: this.registerForm.value.email!,
		// 	phone: this.registerForm.value.phone!,
		// 	photo: this.selectedProfilePhoto as File,
		// 	password: this.registerForm.value.password!,
		// }
		this.accountService.register(this.registerForm.value as RegisterDTO, this.selectedProfilePhoto as File).subscribe(() => {
			// navigate to login page if register successful
			this.router.navigate(['/account/login'])
		})
	}

	onProfilePhotoSelect(event: any){
		this.selectedProfilePhoto = event.files[0];

	}
}
