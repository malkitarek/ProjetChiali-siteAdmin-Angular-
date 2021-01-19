import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePlombierComponent } from './update-plombier.component';

describe('UpdatePlombierComponent', () => {
  let component: UpdatePlombierComponent;
  let fixture: ComponentFixture<UpdatePlombierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePlombierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePlombierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
