import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from '../../shared/user'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb : FormBuilder, private service: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    username : ['', Validators.required],
    password : ['', Validators.required],
  
  });

  get f(){
    return this.loginForm.controls;
  }

  login(){
     this.service.getUsers().subscribe(data => {
       const user = data.find((a:any)=>{
         return a.username === this.loginForm.value.username && a.password === this.loginForm.value.password
       });
       if(user){
         alert("login successful");
         this.loginForm.reset();
         this.router.navigate(['/']);
       }else{
         alert('user not found');
         this.router.navigate(['/register'])
       }
     }, err => {
       alert('something went wrong')
     })
  }

}
