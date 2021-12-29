import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {

  showpassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showconfirmpassword = false;

  constructor( private fb: FormBuilder,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }
  setpasswordForm = this.fb.group({
    password: ['',[Validators.required, Validators.minLength(8), Validators.pattern]],
    confirmpassword: ['', Validators.required],
  },
  { validators: PasswordMatch('password','confirmpassword')});

  submitButton(){
    console.log('submitted')
  }

  get form(){
    return this.setpasswordForm.controls;
  }

  setPassword(){
    const user = this.setpasswordForm.value;
    this.auth.postregisterData
    console.log(user)
  }

  showhidePassword(){
    this.showpassword = !this.showpassword;
    if(this.showpassword){
      document.querySelector('#password')?.setAttribute('type','text');
    }else{
      document.querySelector('#password')?.setAttribute('type','password');
    }
  }
  showhideconfirmPassword(){
    this.showconfirmpassword = !this.showconfirmpassword;
    if(this.showconfirmpassword){
      document.querySelector('#confirmpassword')?.setAttribute('type','text');
    }else{
      document.querySelector('#confirmpassword')?.setAttribute('type','password');
    }
  }
}
