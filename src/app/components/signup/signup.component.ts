import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forbiddenNameValidator } from 'src/app/shared/validators/username.validator';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Register } from 'src/app/shared/user';
import { Router } from '@angular/router';
import {faLeaf, faUser } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user: Register;
  users: Register[] = [];
  submitted = false;
  faUser = faUser;
  arr = [];
  password:any;
  passwordsubmit:boolean;
  showsetpassword = false;
  @Output() register = new EventEmitter();

  constructor(private fb: FormBuilder,
    private service: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }


  signupForm = this.fb.group(
    {
      username: ['', [Validators.required, forbiddenNameValidator]],
      gender:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern("[0-9 ]{10}")]],
      email:['',[Validators.required, Validators.pattern]],
      dob:['']
    }
    // { Validators: PasswordMatch('password','confirmpassword')}
  );

  get signupformcontrol() {
    return this.signupForm.controls;
  }

  submitButton(){
    this.showsetpassword = true;
     const user = {
       showsetpassword: this.showsetpassword,
      username : this.signupForm.value.username,
      gender : this.signupForm.value.gender,
      dob : this.signupForm.value.dob,
      email : this.signupForm.value.email,
      phone : this.signupForm.value.phone
    }
    this.register.emit(user);
    console.log(user)
    this.router.navigate(['/set-password'])
  }

  setPassword(password:any){
    this.password = password;
    this.passwordsubmit = password.passwordsubmit
   }

   signup(){
     console.log('submitted')
   }

}
