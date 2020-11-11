import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRapportComponent } from './dialog-rapport.component';

describe('DialogRapportComponent', () => {
  let component: DialogRapportComponent;
  let fixture: ComponentFixture<DialogRapportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogRapportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRapportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
