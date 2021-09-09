import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have logo img`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('#nav-logo').getAttribute('src')).toContain(
      '../assets/images/A-Del-logo.png'
    );
  });
});
