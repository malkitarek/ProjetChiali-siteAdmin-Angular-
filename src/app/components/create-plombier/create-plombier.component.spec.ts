import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePlombierComponent } from './create-plombier.component';

describe('CreatePlombierComponent', () => {
  let component: CreatePlombierComponent;
  let fixture: ComponentFixture<CreatePlombierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePlombierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePlombierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
