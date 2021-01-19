import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddErreurComponent } from './dialog-add-erreur.component';

describe('DialogAddErreurComponent', () => {
  let component: DialogAddErreurComponent;
  let fixture: ComponentFixture<DialogAddErreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddErreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddErreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
