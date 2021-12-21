import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
import { passwordValidator } from 'src/app/shared/validators/password.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{

  get username() {
    return this.registerForm.get('username');
  }

  // registerForm = new FormGroup({
  //   username : new FormControl('Anushka'),
  //   password : new FormControl(''),
  //   confirmpassword : new FormControl(''),
  //   address : new FormGroup({
  //     city : new FormControl(''),
  //     state : new FormControl(''),
  //     postal : new FormControl('')
      
  //   })
  // })
  registerForm = this.fb.group({
    username : ['', [Validators.required, forbiddenNameValidator]],
    password : [''],
    confirmpassword : [''],
    address : this.fb.group({
      city : [''],
      state : [''],
      postal : ['']
    })
  },{Validators : passwordValidator});

  get f(){
    return this.registerForm.controls;
  }

  constructor(private fb:FormBuilder) { }



}
