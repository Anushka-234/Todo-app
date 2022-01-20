import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { DashboardComponent } from './dashboard.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';
import { delay, of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getTasks on ngOnInit', () => {
    const servicespy = spyOn(service, 'getTasks').and.callThrough();
    const componentsspy = spyOn(component, 'getTasks').and.callThrough();
    expect(servicespy).not.toHaveBeenCalled();
    expect(componentsspy).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(servicespy).toHaveBeenCalledTimes(1);
    expect(componentsspy).toHaveBeenCalledTimes(1);
  });

  it('should validate add list function', () => {
    expect(component.openAddList).toBeDefined();
  });

  it('should validate add task function', () => {
    expect(component.openAddTask).toBeDefined();
  });
});

describe('When the component is loading', () => {
  let nativeElement;
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, HttpClientTestingModule, RouterTestingModule, ToastrModule.forRoot()],
      declarations: [DashboardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    service = TestBed.get(TaskService);
    fixture.detectChanges();
    component.isLoading = true;
    nativeElement = fixture.debugElement.nativeElement;
  });

  it('the spinner should be displayed', () => {
    expect(nativeElement.querySelector('mat-spinner')).toBeTruthy();
  });
});
