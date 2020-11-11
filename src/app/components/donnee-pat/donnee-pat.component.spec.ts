import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonneePatComponent } from './donnee-pat.component';

describe('DonneePatComponent', () => {
  let component: DonneePatComponent;
  let fixture: ComponentFixture<DonneePatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonneePatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonneePatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
