import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CreateListComponent } from './create-list.component';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms'
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CreateListComponent', () => {
  let component: CreateListComponent;
  let fixture: ComponentFixture<CreateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ToastrModule.forRoot(), MatFormFieldModule, MatInputModule,
        BrowserAnimationsModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ],
      declarations: [CreateListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addListForm.valid).toBeFalsy();
  });

  it('Form should be invalid', () => {
    component.addListForm.controls['list'].setValue('');
    expect(component.addListForm.valid).toBeFalsy();
  });

  it('should validate control function', () => {
    expect(component.createListControl).toBeDefined();
  });

  it('should validate close list function', () => {
    expect(component.closeAddList).toBeDefined();
  });

  it('should validate add list function', () => {
    expect(component.addList).toBeDefined();
  });
});
