import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SetPasswordComponent } from './set-password.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SetPasswordComponent', () => {
  let component: SetPasswordComponent;
  let fixture: ComponentFixture<SetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SetPasswordComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot(), BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be invalid', () => {
    component.setpasswordForm.controls['password'].setValue('');
    component.setpasswordForm.controls['confirmpassword'].setValue('');
    expect(component.setpasswordForm.valid).toBeFalsy();
  });

  it('should validate correct password format', () => {
    const password = component.setpasswordForm.get('password');
    password?.setValue('1234@Abc');
    const errors = password?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(password?.valid).toBeTruthy();
  });

  it('should validate if confirm-password matches password', () => {
    const password = component.setpasswordForm.get('password')
    const confirmpassword = component.setpasswordForm.get('confirmpassword');
    password?.setValue('1234@Abc')
    confirmpassword?.setValue('1234@Abc');
    const errors = confirmpassword?.errors || {};
    expect(errors['mustMatch']).toBeFalsy();
    expect(confirmpassword?.valid).toBeTruthy();
  });
});
