import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: Register;
  users: Register[] = [];
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router
  ) {}

  get username() {
    return this.registerForm.get('username');
  }

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, forbiddenNameValidator]],
      password: ['',Validators.required], 
      confirmpassword: ['',[Validators.required, PasswordMatch]],
      email:['',[Validators.required, Validators.pattern]],
      address: this.fb.group({
        city: [''],
        state: [''],
        postal: [''],
      }),
    },
    { Validators: PasswordMatch('password','confirmpassword')}
  );

  get form() {
    return this.registerForm.controls;
  }

  signup() {
    if(this.registerForm.valid){
      this.submitted = true;
      this.user = this.registerForm.value;
      this.service.postregisterData(this.user).subscribe(
        (user) => {
          this.users.push(user);
          alert('signup successful');
          this.registerForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('something went wrong');
        }
      );
      console.log(this.user);
    }else{
      this.validateAllFormFields(this.registerForm);
      alert("Please fill all the fields")
    }
    }
    validateAllFormFields(formGroup: FormGroup) {
      Object.keys(formGroup.controls).forEach((field) => {
        const control = formGroup.get(field);
        if (control instanceof FormControl) {
          control.markAsTouched({ onlySelf: true });
        } else if (control instanceof FormGroup) {
          this.validateAllFormFields(control);
        }
      });
    }

  getUsers() {
    this.service.getUsers().subscribe((data) => (this.users = data));
  }
}
