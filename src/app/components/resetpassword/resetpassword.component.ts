import { trigger, transition, style, animate } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss'],
  animations : [
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
  @Output() passwordSet = new EventEmitter();

  constructor(private fb:FormBuilder, private router:Router) { }

  ngOnInit(): void {
  }
  setpasswordForm = this.fb.group({
    password: ['',[Validators.required, Validators.minLength(8), Validators.pattern]],
    confirmpassword: ['', Validators.required],
  },
  { validators: PasswordMatch('password','confirmpassword')});

  submitButton(){
    console.log('submitted')
    this.router.navigate(['/login'])
  }

  get form(){
    return this.setpasswordForm.controls;
  }
  setPassword(){
    this.passwordsubmit = true;
    const password = {
      passwordsubmit: this.passwordsubmit,
      password : this.setpasswordForm.value.password,
      confirmpassword: this.setpasswordForm.value.confirmpassword,
    }
    this.passwordSet.emit(password);

  }

  showHidePassword(){
    this.showPassword = !this.showPassword;
    if(this.showPassword){
      document.querySelector('#password')?.setAttribute('type','text');
    }else{
      document.querySelector('#password')?.setAttribute('type','password');
    }
  }
  showHideconfirmPassword(){
    this.showConfirmPassword = !this.showConfirmPassword;
    if(this.showConfirmPassword){
      document.querySelector('#confirmpassword')?.setAttribute('type','text');
    }else{
      document.querySelector('#confirmpassword')?.setAttribute('type','password');
    }
  }

}
