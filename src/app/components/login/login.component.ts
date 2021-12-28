import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from '../../shared/user';
import {  faEnvelope,
  faLock,
  faTimes,
  faEye,
  faEyeSlash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = '1';
  authResponse: any;
  submitted: boolean = false;
  showpassword = false;


  faEnvelope = faEnvelope;
  faLock = faLock;
  faTimes = faTimes;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  get form() {
    return this.loginForm.controls;
  }

  login() {
    if(this.loginForm.valid){this.submitted = true;
      this.auth.getUsers().subscribe(
        (data) => {
          const user = data.find((a: any) => {
            return (
              a.username === this.loginForm.value.username &&
              a.password === this.loginForm.value.password
            );
          });
          if (user) {
            alert('login successful');
            this.authResponse = user;
            localStorage.setItem('SessionUser', this.user);
            console.log(user);
            if (user.token) {
              localStorage.setItem('token', user.token);
              this.loginForm.reset();
              this.router.navigate(['/']);
            } else {
              console.log('user not found ');
              alert('user not found');
              this.router.navigate(['/register']);
            }
          }
        },
        (err) => {
          alert('something went wrong');
        }
      );}else{
        this.validateAllFormFields(this.loginForm);
        alert("Invalid Form")
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
  token() {
    console.log(this.auth.gettoken());
  }

  showhidePassword(){
    this.showpassword = !this.showpassword;
    if(this.showpassword){
      document.querySelector('#password')?.setAttribute('type','text');
    }else{
      document.querySelector('#password')?.setAttribute('type','password');
    }
  }
}
