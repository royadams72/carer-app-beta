import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNurseComponent } from './create-nurse.component';

describe('CreateNurseComponent', () => {
  let component: CreateNurseComponent;
  let fixture: ComponentFixture<CreateNurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
