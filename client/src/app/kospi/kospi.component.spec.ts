import { KospiComponent } from './kospi.component';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';



describe('KosdaqComponent', () => {
  let component: KospiComponent;
  let fixture: ComponentFixture<KospiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KospiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KospiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
