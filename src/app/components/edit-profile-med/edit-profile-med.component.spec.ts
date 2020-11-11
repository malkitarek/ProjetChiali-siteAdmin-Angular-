import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileMedComponent } from './edit-profile-med.component';

describe('EditProfileMedComponent', () => {
  let component: EditProfileMedComponent;
  let fixture: ComponentFixture<EditProfileMedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileMedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileMedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
