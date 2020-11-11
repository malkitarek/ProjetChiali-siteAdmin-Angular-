import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppMembreComponent } from './dialog-supp-membre.component';

describe('DialogSuppMembreComponent', () => {
  let component: DialogSuppMembreComponent;
  let fixture: ComponentFixture<DialogSuppMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuppMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
