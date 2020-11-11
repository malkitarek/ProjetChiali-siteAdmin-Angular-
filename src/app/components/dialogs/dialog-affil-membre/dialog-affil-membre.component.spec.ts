import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAffilMembreComponent } from './dialog-affil-membre.component';

describe('DialogAffilMembreComponent', () => {
  let component: DialogAffilMembreComponent;
  let fixture: ComponentFixture<DialogAffilMembreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAffilMembreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAffilMembreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
