import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UrlSerializer } from '@angular/router';
import { Header3Component } from './header3.component';

describe('Header3Component', () => {
  let component: Header3Component;
  let fixture: ComponentFixture<Header3Component>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Header3Component ],
      imports: [IonicModule.forRoot()],
      providers: [{
        provide: UrlSerializer}]
    }).compileComponents();

    fixture = TestBed.createComponent(Header3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
