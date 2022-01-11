import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login, Register } from '../../shared/user';
import {
  faEnvelope,
  faLock,
  faTimes,
  faEye,
  faEyeSlash,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user = '1';
  authResponse: Register;
  submitted: boolean = false;
  showPassword = false;
  one = "hello"
  faEnvelope = faEnvelope;
  faLock = faLock;
  faTimes = faTimes;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;
  loginForm !: FormGroup;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern]],
      password: ['', Validators.required],
    });
  }

  get form() {
    return this.loginForm.controls;
  }


  login(): void {
    if (this.loginForm.valid) {
      this.submitted = true;
      this.auth.getUsers().subscribe(
        (data) => {
          const user = data.find((a: Register) => {
            return (
              a.email === this.loginForm.value.email &&
              a.password === this.loginForm.value.password
            );
          });
          if (user) {
            this.toastr.success("Login Successful", "Welcome")
            this.authResponse = user;
            localStorage.setItem('SessionUser', this.user);
            console.log(user);
            if (user.token) {
              localStorage.setItem('token', user.token);
              this.loginForm.reset();
              this.router.navigate(['/']);
            }
          } else {
            this.toastr.error("User not found", "Error")
          }
        },
        (error) => {
          this.toastr.error("Invalid login", "Error")
          alert("Sorry we have no information about you!");
        });
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

  submitButton(): void {
    console.log("submitted");
  }

  showhidePassword() {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      document.querySelector('#password')?.setAttribute('type', 'text');
    } else {
      document.querySelector('#password')?.setAttribute('type', 'password');
    }
  }
}
