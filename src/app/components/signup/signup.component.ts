import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from 'src/app/shared/user';
import { Router } from '@angular/router';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {
  user: Register;
  users: Register[] = [];
  submitted = false;
  faUser = faUser;
  arr = [];
  password: string;
  passwordsubmit: boolean;
  showsetpassword = false;
  signupForm !: FormGroup;
  @Output() register = new EventEmitter();

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group(
      {
        username: ['', [Validators.required, forbiddenNameValidator]],
        gender: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern("[0-9 ]{10}")]],
        email: ['', [Validators.required, Validators.pattern]],
        dob: ['']
      });
  }

  get signupformcontrol() {
    return this.signupForm.controls;
  }

  submitButton(): void {
    this.showsetpassword = true;
    this.service.userData = this.signupForm.value;
    this.router.navigate(['/set-password']);
  }

  submit(): void {
    console.log('submitted');
  }
}
