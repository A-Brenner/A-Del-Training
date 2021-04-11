import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  // Creates and sets the onClick method for Training Programs on navbar
  setUpTrainingProgramsBtn(): void {
    let navTrainingProgramsBtn = document.getElementById(
      'nav-training-programs'
    );
    let router: Router = this.router;
    navTrainingProgramsBtn?.addEventListener('click', function (): void {
      if (
        window.localStorage.getItem('fName') &&
        window.localStorage.getItem('lName')
      ) {
        navTrainingProgramsBtn?.setAttribute(
          'routerLink',
          '/training-programs'
        );
        router.navigateByUrl('/training-programs');
      } else {
        alert('Please enter your name before beginning.');
      }
    });
  }

  resizeNavBar(): void {
    console.log('resizing... width:: ' + window.innerWidth);
  }

  // Calculates the distance between the nav-bar links and the Logo
  // Returns that distance
  calculateDistance(): number {
    let navLinks = document.getElementById('nav-links');
    let navLogo = document.getElementById('nav-logo');
    let windowWidth = window.innerWidth;
    let navLinksWidth = navLinks?.offsetWidth;
    let logoWidth = navLogo?.offsetWidth;
    let distanceLogotoLinks: number = 0;

    if (navLinksWidth && logoWidth) {
      distanceLogotoLinks = windowWidth - (navLinksWidth + logoWidth);
    }

    return distanceLogotoLinks;
  }

  // component start-up
  ngOnInit(): void {
    this.setUpTrainingProgramsBtn();
    //this.checkLanguage();
    window.addEventListener('resize', this.resizeNavBar);
  }
}
