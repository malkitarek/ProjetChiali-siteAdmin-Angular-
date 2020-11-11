import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezVousPatComponent } from './rendez-vous-pat.component';

describe('RendezVousPatComponent', () => {
  let component: RendezVousPatComponent;
  let fixture: ComponentFixture<RendezVousPatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendezVousPatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendezVousPatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
