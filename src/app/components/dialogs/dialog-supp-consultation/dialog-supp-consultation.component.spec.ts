import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppConsultationComponent } from './dialog-supp-consultation.component';

describe('DialogSuppConsultationComponent', () => {
  let component: DialogSuppConsultationComponent;
  let fixture: ComponentFixture<DialogSuppConsultationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuppConsultationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppConsultationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
