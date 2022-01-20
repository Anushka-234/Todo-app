import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})

export class ResetpasswordComponent implements OnInit {
  showPassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showConfirmPassword = false;
  passwordsubmit = false;
  resetpasswordForm !: FormGroup;
  @Output() passwordSet = new EventEmitter();

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.resetpasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
      confirmpassword: ['', Validators.required],
    },
      { validators: PasswordMatch('password', 'confirmpassword') });
  }

  submitButton(): void {
    console.log('submitted');
    this.router.navigate(['/login']);
  }

  get form() {
    return this.resetpasswordForm.controls;
  }

  setPassword(): void {
    this.passwordsubmit = true;
    const password = {
      passwordsubmit: this.passwordsubmit,
      password: this.resetpasswordForm.value.password,
      confirmpassword: this.resetpasswordForm.value.confirmpassword,
    }
    this.passwordSet.emit(password);
  }

  showHidePassword(): void {
    this.showPassword = !this.showPassword;
    if (this.showPassword) {
      document.querySelector('#password')?.setAttribute('type', 'text');
    } else {
      document.querySelector('#password')?.setAttribute('type', 'password');
    }
  }

  showHideconfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
    if (this.showConfirmPassword) {
      document.querySelector('#confirmpassword')?.setAttribute('type', 'text');
    } else {
      document.querySelector('#confirmpassword')?.setAttribute('type', 'password');
    }
  }
}
