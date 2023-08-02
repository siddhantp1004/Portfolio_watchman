import { Component, OnInit } from '@angular/core';
//import { FormBuilder,FormGroup,Validators,FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import ValidateForm from 'src/app/helpers/validateForm';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  type: string = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';
  public signUpForm!: FormGroup;
  constructor(private fb: FormBuilder,private auth:AuthService,private router:Router) {}
  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.isText ? (this.type = 'text') : (this.type = 'password');
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.auth.signUp(this.signUpForm.value)
      .subscribe({
        next:(res=>{
          console.log(res.message);
          
          alert(res.message);
          this.signUpForm.reset();
          this.router.navigate(['login']);
        }),
        error:(err=>{
          alert(err?.error.message)
        })
      })
    } else {
      ValidateForm.validateAllFormFields(this.signUpForm);
    }
   }
  }

