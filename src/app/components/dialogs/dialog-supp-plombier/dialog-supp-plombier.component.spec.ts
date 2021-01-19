import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuppPlombierComponent } from './dialog-supp-plombier.component';

describe('DialogSuppPlombierComponent', () => {
  let component: DialogSuppPlombierComponent;
  let fixture: ComponentFixture<DialogSuppPlombierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogSuppPlombierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogSuppPlombierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
