import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faCheck, faEnvelope, faTimes } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  faCheck = faCheck;
  faTimes = faTimes;
  faEnvelope = faEnvelope;

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  forgotpasswordForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern]]
  });

  get form() {
    return this.forgotpasswordForm.controls;
  }

  submitButton(){
    console.log(this.forgotpasswordForm.value);
  }

  submit(){
    console.log(this.forgotpasswordForm.value);
  }

  ngOnInit(): void {
  }

}
