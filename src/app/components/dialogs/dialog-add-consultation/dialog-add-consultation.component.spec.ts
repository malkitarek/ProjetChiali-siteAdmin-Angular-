import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddConsultationComponent } from './dialog-add-consultation.component';

describe('DialogAddConsultationComponent', () => {
  let component: DialogAddConsultationComponent;
  let fixture: ComponentFixture<DialogAddConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
