import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Login } from '../../shared/user';
import {  faEnvelope,
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
  authResponse: any;
  submitted: boolean = false;
  showpassword = false;
  one="hello"
  faEnvelope = faEnvelope;
  faLock = faLock;
  faTimes = faTimes;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  faCheck = faCheck;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    console.log(this.one)
  }

  loginForm = this.fb.group({
    email: ['', [Validators.required,Validators.pattern]],
    password: ['', Validators.required],
  });

  get form() {
    return this.loginForm.controls;
  }





  login() {
    this.auth
      .login(
        this.loginForm.controls['email'].value,
        this.loginForm.controls['password'].value
      )
      .subscribe(
        (response) => {
          this.authResponse = response;
          if (response.token) {
            localStorage.setItem('token', response.token);
            this.toastr.success('Login Successful','message')
            this.router.navigate(['']);
          
            console.log('success')
          }
        },
        (error) => {
          this.toastr.error("Invalid Login","Error")
         
        });
  }

  // login(): void {
  //   if(this.loginForm.valid){this.submitted = true;
  //     this.auth.getUsers().subscribe(
  //       (data) => {
  //         const user = data.find((a: any) => {
  //           return (
  //             a.email === this.loginForm.value.email &&
  //             a.password === this.loginForm.value.password
  //           );
  //         });
  //         if (user) {
  //           alert('login successful');
  //           this.authResponse = user;
  //           localStorage.setItem('SessionUser', this.user);
  //           console.log(user);
  //           if (user.token) {
  //             localStorage.setItem('token', user.token);
  //             this.loginForm.reset();
  //             this.router.navigate(['/']);
  //           } else {
  //             console.log('user not found ');
  //             alert('user not found');
  //             this.router.navigate(['/register']);
  //           }
  //         }
  //       },
  //       (error) => {
  //         alert("Sorry we have no information about you!");
  //       });
  // }

  // }


 
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

  submitButton():void{
    console.log("submitted");
  }

  showhidePassword(){
    this.showpassword = !this.showpassword;
    if(this.showpassword){
      document.querySelector('#password')?.setAttribute('type','text');
    }else{
      document.querySelector('#password')?.setAttribute('type','password');
    }
  }
}
