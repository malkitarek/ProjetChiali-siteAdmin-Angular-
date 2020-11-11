import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetMdpComponent } from './forget-mdp.component';

describe('ForgetMdpComponent', () => {
  let component: ForgetMdpComponent;
  let fixture: ComponentFixture<ForgetMdpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetMdpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetMdpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
