import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faEye, faEyeSlash, fas } from '@fortawesome/free-solid-svg-icons';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';
import { animate, style, transition, trigger } from '@angular/animations';
import { Register } from 'src/app/shared/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
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

export class SetPasswordComponent implements OnInit {
  @Input() userdata: Register;
  showpassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showconfirmpassword = false;
  passwordsubmit = false;
  setpasswordForm !: FormGroup;
  signupData: Register = new Register();
  @Output() passwordSet = new EventEmitter();

  constructor(private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.setpasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern]],
      confirmpassword: ['', Validators.required],
    },
      { validators: PasswordMatch('password', 'confirmpassword') });
  }


  submitButton() {
    if (this.setpasswordForm.valid) {
      this.signupData = this.auth.userData;
      this.signupData.username = this.signupData.username;
      this.signupData.dob = this.signupData.dob;
      this.signupData.gender = this.signupData.gender;
      this.signupData.phone = this.signupData.phone;
      this.signupData.email = this.signupData.email;
      this.signupData.password = this.setpasswordForm.value.password;
      this.signupData.confirmpassword = this.setpasswordForm.value.confirmpassword;
      this.auth.postregisterData(this.signupData).subscribe((data) => {
        console.log(data)
        this.router.navigate(['login'])
      })
    }

    this.toastr.success('password set', 'success')
    console.log('submitted')
  }

  get form() {
    return this.setpasswordForm.controls;
  }

  setPassword() {
    console.log("submitted")

  }

  showhidePassword() {
    this.showpassword = !this.showpassword;
    if (this.showpassword) {
      document.querySelector('#password')?.setAttribute('type', 'text');
    } else {
      document.querySelector('#password')?.setAttribute('type', 'password');
    }
  }
  showhideconfirmPassword() {
    this.showconfirmpassword = !this.showconfirmpassword;
    if (this.showconfirmpassword) {
      document.querySelector('#confirmpassword')?.setAttribute('type', 'text');
    } else {
      document.querySelector('#confirmpassword')?.setAttribute('type', 'password');
    }
  }
}
