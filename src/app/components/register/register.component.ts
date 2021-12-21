import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
import { passwordValidator } from 'src/app/shared/validators/password.validator';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from 'src/app/shared/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent{
  user : Register;
  users:Register[] = [];

  constructor(private fb:FormBuilder, private service : AuthService, private router : Router) { }

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

  signup(){
    this.user = this.registerForm.value;
    this.service.registerUser(this.user).subscribe(user => {
      this.users.push(user);
    alert('signup successful');
    this.registerForm.reset();
    this.router.navigate(['login'])
  }, err => {
    alert("something went wrong")
  })
    console.log(this.user)
  }

  getUsers(){
    this.service.getUsers().subscribe(data => this.users = data)
  }






}
