import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ForgotPasswordComponent } from './forgot-password.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogModule } from '@angular/material/dialog';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ForgotPasswordComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, MatDialogModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('Form should be invalid', () => {
    component.forgotPasswordForm.controls['email'].setValue('');
    expect(component.forgotPasswordForm.valid).toBeFalsy();
  });

  it('should validate correct email format', () => {
    const email = component.forgotPasswordForm.get('email');
    email?.setValue('test@test.com');
    const errors = email?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(email?.valid).toBeTruthy();
  });
});
