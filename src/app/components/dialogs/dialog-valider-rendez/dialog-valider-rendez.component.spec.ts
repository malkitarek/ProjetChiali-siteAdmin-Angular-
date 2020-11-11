import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogValiderRendezComponent } from './dialog-valider-rendez.component';

describe('DialogValiderRendezComponent', () => {
  let component: DialogValiderRendezComponent;
  let fixture: ComponentFixture<DialogValiderRendezComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogValiderRendezComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogValiderRendezComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
