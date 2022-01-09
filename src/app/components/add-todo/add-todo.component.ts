import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Todo } from '../../shared/todo';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss'],
})
export class AddTodoComponent implements OnInit {
  time: string;
  defaultOpenValue = new Date(0, 0, 0, 0, 0, 0);

  title: string;
  day: string;
  priority: string;
  @Output() todoAdd: EventEmitter<Todo> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  addtodoForm = this.fb.group({
    title: ['', [Validators.required]],
    day: ['', Validators.required],
    time: [''],
    priority: [''],
  });

  get f() {
    return this.addtodoForm.controls;
  }

  onSubmit() {
    if (this.addtodoForm.valid) {
      const todo = {
        title: this.addtodoForm.value.title,
        day: this.addtodoForm.value.day,
        time: this.addtodoForm.value.time,
        priority: this.addtodoForm.value.priority,
      };
      console.log(todo);
      this.todoAdd.emit(todo);
      this.addtodoForm.reset();
    } else {
      this.validateAllFormFields(this.addtodoForm);
      console.log('Invalid Form');
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}
