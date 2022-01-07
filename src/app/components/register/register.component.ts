import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
// import { PasswordMatch } from 'src/app/shared/validators/password.validator';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from 'src/app/shared/user';
import { Router } from '@angular/router';
import {faLeaf, faUser } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  user: Register;
  users: Register[] = [];
  submitted = false;
  faUser = faUser;
  arr = [];
  password:any;
  passwordsubmit:boolean;
  registereduser: Register;
  showsetpassword:boolean;
  userdata:Register;
  tesla:string= "hello world"

  constructor(
    private fb: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr:ToastrService
  ) {}


  get username() {
    return this.registerForm.get('username');
  }

  registerForm = this.fb.group(
    {
      username: ['', [Validators.required, forbiddenNameValidator]],
      gender:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      email:['',[Validators.required, Validators.pattern]],
      dob:['']
    }
    // { Validators: PasswordMatch('password','confirmpassword')}
  );

  get registerformcontrol() {
    return this.registerForm.controls;
  }

 

  // register() {
  //   if(this.registerForm.valid){
  //     this.submitted = true;
  //     const user = {
  //       username : this.registereduser.username,
  //       gender:this.registereduser.gender,
  //       dob: this.registereduser.dob,
  //       phone : this.registereduser.phone,
  //       email: this.registereduser.email,
  //       password : this.password.password,
  //       confirmpassword: this.password.confirmpassword,
  //       token:this.registereduser.token,
  //       showsetpassword:this.registereduser.showsetpassword

  //     }
  //     console.log(user.password)
  //     this.service.postregisterData(user).subscribe(
  //       (user) => {
  //         this.users.push(user);
  //         console.log(this.users)
  //         alert('signup successful');
  //         this.registerForm.reset();
  //         this.router.navigate(['login']);
  //       },
  //       (err) => {
  //         alert('something went wrong');
  //       }
  //     );
  //   }else{
  //     this.validateAllFormFields(this.registerForm);
  //     alert("Please fill all the fields")
  //   }
  //   }
  //   validateAllFormFields(formGroup: FormGroup) {
  //     Object.keys(formGroup.controls).forEach((field) => {
  //       const control = formGroup.get(field);
  //       if (control instanceof FormControl) {
  //         control.markAsTouched({ onlySelf: true });
  //       } else if (control instanceof FormGroup) {
  //         this.validateAllFormFields(control);
  //       }
  //     });
  //   }

  getUsers() {
    this.service.getUsers().subscribe((data) => (this.users = data));
  }

  submitButton(){
    const test = this.registerForm.value;
  }

  setPassword(password:any){
   this.password = password;
   this.passwordsubmit = password.passwordsubmit
   
  }

  registerUser(newuser:Register){
    this.registereduser = newuser;
    this.userdata = this.registereduser;
    this.showsetpassword = newuser.showsetpassword
    this.toastr.success('registered','success')
  }

  // register(){
  //   this.userdata = {
  //     username : this.registereduser.username,
  //     gender:this.registereduser.gender,
  //     dob: this.registereduser.dob,
  //     phone : this.registereduser.phone,
  //     email: this.registereduser.email,
  //     password : this.password.password,
  //     confirmpassword: this.password.confirmpassword,
  //     token:this.registereduser.token,
  //     showsetpassword:this.registereduser.showsetpassword
  //   }
  //   console.log(this.userdata)
  // }

}
