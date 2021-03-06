import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  isRightSize: boolean = false;

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

  // Properly resizes the fonts of nav-bar links to prevent marginal errors
  resizeNavBar(
    app: AppComponent,
    navLinks: HTMLElement,
    homeLink: HTMLElement,
    trainingProgramsLink: HTMLElement,
    navLogo: HTMLInputElement
  ): void {
    // If page has been translated AND nav-bar hasn't already been properly resized
    if (homeLink.textContent !== 'Home' && !app.isRightSize) {
      let windowWidth: number = window.innerWidth;
      let navLinksWidth: number = navLinks?.offsetWidth;
      let logoWidth: number = navLogo?.offsetWidth;
      // Calculates the distance between the nav-bar links and the Logo
      let distanceLogotoLinks: number =
        windowWidth - (navLinksWidth + logoWidth);

      // Get current font-size of element
      let style = window
        .getComputedStyle(homeLink, null)
        .getPropertyValue('font-size');
      let currentFontSize = parseFloat(style);

      //  ** Testing purposes **
      //console.log('window width: ' + window.innerWidth);
      //console.log('Font-size: ' + currentFontSize);
      //console.log('Distance: ' + distanceLogotoLinks);

      // If winddow is too small, get rid of links
      if (windowWidth <= 215) {
        homeLink.style.fontSize = 0 + 'px';
        trainingProgramsLink.style.fontSize = 0 + 'px';
        app.isRightSize = true; // Done resizing

        // If distance between logo and links is small, decrease font size of links
      } else if (distanceLogotoLinks <= 5) {
        homeLink.style.fontSize = currentFontSize - 1 + 'px';
        trainingProgramsLink.style.fontSize = currentFontSize - 1 + 'px';

        // If distance is between logo and links is large, increase font if not already at max (16px)
      } else if (distanceLogotoLinks >= 25 && currentFontSize < 16) {
        homeLink.style.fontSize = currentFontSize + 1 + 'px';
        trainingProgramsLink.style.fontSize = currentFontSize + 1 + 'px';

        // Resizing is finished
      } else {
        app.isRightSize = true; // Done resizing
      }
    }
  }

  // component start-up
  ngOnInit(): void {
    this.setUpTrainingProgramsBtn();

    let navLinks: HTMLElement = document.getElementById(
      'nav-links'
    ) as HTMLElement;
    let homeLink: HTMLElement = document.getElementById(
      'nav-home'
    ) as HTMLElement;
    let trainingProgramsLink: HTMLElement = document.getElementById(
      'nav-training-programs'
    ) as HTMLElement;
    let navLogo: HTMLInputElement = document.getElementById(
      'nav-logo'
    ) as HTMLInputElement;
    let app: AppComponent = this;

    // resizes elements within navbar when window is resized
    window.addEventListener('resize', function (): void {
      app.isRightSize = false;
      app.resizeNavBar(app, navLinks, homeLink, trainingProgramsLink, navLogo);
    });

    // Checks every second if resizing within navbar is needed on nav-bar
    //This is necessary only when someone translates the page to another language
    setInterval(function (): void {
      app.resizeNavBar(app, navLinks, homeLink, trainingProgramsLink, navLogo);
    }, 100);
  }
}
