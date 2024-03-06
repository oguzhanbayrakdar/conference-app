import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputGroupModule } from 'primeng/inputgroup'
import { InputTextModule } from 'primeng/inputtext';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccountService } from '../../services/account.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
		ButtonModule,
		FormsModule,
		ReactiveFormsModule,
		InputGroupModule,
    InputGroupAddonModule,
		InputTextModule,
		HttpClientModule
	],
	providers: [AccountService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
	submitted = false;
	
	loginForm: FormGroup = new FormGroup({
		email: new FormControl(''),
		password: new FormControl('')
	});

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]]
		})
	}

	login(){
		this.submitted = true
		if(this.loginForm.invalid) return;

		// Makes http request to login and gets a jwt token.
		this.accountService.login(this.loginForm.value).subscribe()
	}

	get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }

}
