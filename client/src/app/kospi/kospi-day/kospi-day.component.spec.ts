import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KospiDayComponent } from './kospi-day.component';

describe('KospiDayComponent', () => {
  let component: KospiDayComponent;
  let fixture: ComponentFixture<KospiDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KospiDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KospiDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
