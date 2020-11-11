import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfilePatComponent } from './edit-profile-pat.component';

describe('EditProfilePatComponent', () => {
  let component: EditProfilePatComponent;
  let fixture: ComponentFixture<EditProfilePatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfilePatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfilePatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
