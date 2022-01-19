import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AddTaskComponent } from './add-task.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule,
        ToastrModule.forRoot(), MatSelectModule, MatInputModule, MatFormFieldModule, BrowserAnimationsModule],
      providers: [
        {
          provide: MatDialogRef,
          useValue: {}
        }
      ],
      declarations: [AddTaskComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form invalid when empty', () => {
    expect(component.addTaskForm.valid).toBeFalsy();
  });

  it('Form should be invalid', () => {
    component.addTaskForm.controls['task'].setValue('');
    component.addTaskForm.controls['list'].setValue('');
    component.addTaskForm.controls['priority'].setValue('');
    component.addTaskForm.controls['date'].setValue('');
    expect(component.addTaskForm.valid).toBeFalsy();
  });

  it('should validate control function', () => {
    expect(component.addTaskControl).toBeDefined();
  });

  it('should validate close task function', () => {
    expect(component.closeAddTask).toBeDefined();
  });

  it('should validate add task function', () => {
    expect(component.addTask).toBeDefined();
  });
});
