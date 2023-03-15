import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskComponent } from './task.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatCardModule } from '@angular/material/card';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskComponent ],
      imports: [ HttpClientTestingModule, MatCardModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
