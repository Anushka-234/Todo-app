import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { By } from '@angular/platform-browser';
import { ResetpasswordComponent } from '../resetpassword/resetpassword.component';
import { DebugElement } from '@angular/core';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('Form should be invalid', () => {
    component.signupForm.controls['username'].setValue('');
    component.signupForm.controls['gender'].setValue('');
    component.signupForm.controls['dob'].setValue('');
    component.signupForm.controls['phone'].setValue('');
    component.signupForm.controls['email'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('should validate correct email format', () => {
    const email = component.signupForm.get('email');
    email?.setValue('test@test.com');
    const errors = email?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(email?.valid).toBeTruthy();
  });

  it('should validate correct phone format', () => {
    const phone = component.signupForm.get('phone');
    phone?.setValue('1234567890');
    const errors = phone?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(phone?.valid).toBeTruthy();
  });

  it('should validate correct usernames format', () => {
    const username = component.signupForm.get('username');
    username?.setValue('anu');
    const errors = username?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(username?.valid).toBeTruthy();
  });

  it('should validate validation messages', () => {
    expect(component.signupformcontrol).toBeDefined();
  });

  it('should validate error message', () => {
    let error: DebugElement;
    fixture.detectChanges();
    error = fixture.debugElement.query(By.css('.error-message'));
    expect(error).toBeFalsy();
  })
});
