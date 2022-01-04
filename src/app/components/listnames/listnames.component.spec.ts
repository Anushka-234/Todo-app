import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnamesComponent } from './listnames.component';

describe('ListnamesComponent', () => {
  let component: ListnamesComponent;
  let fixture: ComponentFixture<ListnamesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListnamesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
