import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageMPComponent } from './message-m-p.component';

describe('MessageMPComponent', () => {
  let component: MessageMPComponent;
  let fixture: ComponentFixture<MessageMPComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageMPComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageMPComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
