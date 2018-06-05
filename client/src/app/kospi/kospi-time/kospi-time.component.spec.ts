import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KospiTimeComponent } from './kospi-time.component';

describe('KospiTimeComponent', () => {
  let component: KospiTimeComponent;
  let fixture: ComponentFixture<KospiTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KospiTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KospiTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
