import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UrlSerializer } from '@angular/router';
import { Header2Component } from './header2.component';

describe('Header2Component', () => {
  let component: Header2Component;
  let fixture: ComponentFixture<Header2Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Header2Component ],
      imports: [IonicModule.forRoot()],
      providers: [{
        provide: UrlSerializer}]
    }).compileComponents();

    fixture = TestBed.createComponent(Header2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
