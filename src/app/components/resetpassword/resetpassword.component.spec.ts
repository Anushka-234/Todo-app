import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ResetpasswordComponent } from './resetpassword.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('ResetpasswordComponent', () => {
  let component: ResetpasswordComponent;
  let fixture: ComponentFixture<ResetpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResetpasswordComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule, RouterTestingModule, BrowserAnimationsModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Form should be invalid', () => {
    component.resetpasswordForm.controls['password'].setValue('');
    component.resetpasswordForm.controls['confirmpassword'].setValue('');
    expect(component.resetpasswordForm.valid).toBeFalsy();
  });

  it('should validate correct password format', () => {
    const password = component.resetpasswordForm.get('password');
    password?.setValue('1234@Abc');
    const errors = password?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(password?.valid).toBeTruthy();
  });

  it('should validate if confirm-password matches password', () => {
    const password = component.resetpasswordForm.get('password')
    const confirmpassword = component.resetpasswordForm.get('confirmpassword');
    password?.setValue('1234@Abc')
    confirmpassword?.setValue('1234@Abc');
    const errors = confirmpassword?.errors || {};
    expect(errors['mustMatch']).toBeFalsy();
    expect(confirmpassword?.valid).toBeTruthy();
  });
});
