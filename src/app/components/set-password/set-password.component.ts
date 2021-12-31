import { Component, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { faEye, faEyeSlash, fas} from '@fortawesome/free-solid-svg-icons';
import { PasswordMatch } from 'src/app/shared/validators/password.validator';
import { animate, style, transition, trigger } from '@angular/animations';
import { Register } from 'src/app/shared/user';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss'],
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
export class SetPasswordComponent implements OnInit {
  @Input() userdata:Register;
  showpassword = false;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  showconfirmpassword = false;
  passwordsubmit = false;
  data:any;
  @Output() passwordSet = new EventEmitter();

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
    console.log('password cobmined',this.userdata)
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
