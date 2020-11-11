import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmeComponent } from './confirme.component';

describe('ConfirmeComponent', () => {
  let component: ConfirmeComponent;
  let fixture: ComponentFixture<ConfirmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfirmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
