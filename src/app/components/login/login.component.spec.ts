import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { LoginComponent } from './login.component';
import { AuthService } from './../../shared/services/auth.service'
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Register } from 'src/app/shared/user';
import { By } from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot(), RouterTestingModule],
      declarations: [LoginComponent]
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

  it('form invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('Form should be invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate correct email format', () => {
    const email = component.loginForm.get('email');
    email?.setValue('test@test.com');
    const errors = email?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(email?.valid).toBeTruthy();
  });

  it('should validate password', () => {
    const password = component.loginForm.get('password');
    password?.setValue('test');
    const errors = password?.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
    expect(password?.valid).toBeTruthy();
  });

  it('Should call the submitButton', () => {
    fakeAsync(() => {
      fixture.detectChanges();
      spyOn(component, 'submitButton');
      el = fixture.debugElement.query(By.css('Login')).nativeElement;
      el.click();
      expect(component.submitButton).toHaveBeenCalledTimes(0);
    })
  });

  it('should validate error messages', () => {
    const { debugElement } = fixture;
    let messages = debugElement.queryAll(By.css('.error-message'));
    expect(messages).toBeTrue;
  })

  it('should validate validation messages', () => {
    expect(component.loginFormControl).toBeDefined();
  })
});
