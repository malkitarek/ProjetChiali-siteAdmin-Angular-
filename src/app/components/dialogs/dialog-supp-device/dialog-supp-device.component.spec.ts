import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppDeviceComponent } from './dialog-supp-device.component';

describe('DialogSuppDeviceComponent', () => {
  let component: DialogSuppDeviceComponent;
  let fixture: ComponentFixture<DialogSuppDeviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuppDeviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppDeviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
