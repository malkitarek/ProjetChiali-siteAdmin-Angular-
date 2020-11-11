import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailChanelComponent } from './detail-chanel.component';

describe('DetailChanelComponent', () => {
  let component: DetailChanelComponent;
  let fixture: ComponentFixture<DetailChanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailChanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailChanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
