import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogOrdonnanceComponent } from './dialog-ordonnance.component';

describe('DialogOrdonnanceComponent', () => {
  let component: DialogOrdonnanceComponent;
  let fixture: ComponentFixture<DialogOrdonnanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogOrdonnanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogOrdonnanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
