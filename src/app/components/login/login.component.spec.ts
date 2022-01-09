import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[{FormBuilder}]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should validate correct email format',()=>{
    const email = component.loginForm.get('email');
    email?.setValue('admin@admin.com');
    const errors = email?.errors || {};

    expect(errors?.['required']).toBeFalsy();
    expect(email?.valid).toBeTruthy();
  })

  it('should validate password',()=>{
    const password = component.loginForm.get('password');
    password?.setValue('admin123');
    const errors = password?.errors || {};

    expect(errors?.['required']).toBeFalsy();
    expect(password?.valid).toBeTruthy();
  })

});
