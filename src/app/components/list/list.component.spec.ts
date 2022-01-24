import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ListComponent } from './list.component';
import { ToastrModule } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/services/task.service';


describe('ListnamesComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let service: TaskService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      declarations: [ListComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(TaskService);
  });

  it('should call getTasks on ngOnInit', () => {
    const servicespy = spyOn(service, 'getTasks').and.callThrough();
    const componentsspy = spyOn(component, 'getTasksofList').and.callThrough();
    expect(servicespy).not.toHaveBeenCalled();
    expect(componentsspy).not.toHaveBeenCalled();
    component.ngOnInit();
    expect(componentsspy).toHaveBeenCalledTimes(1);
    expect(servicespy).toHaveBeenCalledTimes(1);
  });
});
