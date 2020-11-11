import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogShowConsultationComponent } from './dialog-show-consultation.component';

describe('DialogShowConsultationComponent', () => {
  let component: DialogShowConsultationComponent;
  let fixture: ComponentFixture<DialogShowConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogShowConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogShowConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
