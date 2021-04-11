import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  isResized: boolean = false;

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

  // Resizes Nav-bar as window is resized
  resizeNavBar(): void {
    let navLinks: HTMLElement = document.getElementById(
      'nav-links'
    ) as HTMLElement;
    let homeLink: HTMLElement = document.getElementById(
      'nav-training-programs'
    ) as HTMLElement;
    let trainingProgramsLink: HTMLElement = document.getElementById(
      'nav-home'
    ) as HTMLElement;
    let navLogo: HTMLInputElement = document.getElementById(
      'nav-logo'
    ) as HTMLInputElement;
    let windowWidth: number = window.innerWidth;
    let navLinksWidth: number = navLinks?.offsetWidth;
    let logoWidth: number = navLogo?.offsetWidth;
    // Calculates the distance between the nav-bar links and the Logo
    let distanceLogotoLinks: number = windowWidth - (navLinksWidth + logoWidth);

    let style = window
      .getComputedStyle(homeLink, null)
      .getPropertyValue('font-size');
    let currentFontSize = parseFloat(style);
    console.log('window width: ' + window.innerWidth);
    console.log('Font-size: ' + currentFontSize);
    console.log('Distance: ' + distanceLogotoLinks);

    if (windowWidth <= 215) {
      homeLink.style.fontSize = 0 + 'px';
      trainingProgramsLink.style.fontSize = 0 + 'px';
    } else if (distanceLogotoLinks <= 5) {
      homeLink.style.fontSize = currentFontSize - 1 + 'px';
      trainingProgramsLink.style.fontSize = currentFontSize - 1 + 'px';
    } else if (distanceLogotoLinks >= 20) {
      if (currentFontSize < 16) {
        homeLink.style.fontSize = currentFontSize + 1 + 'px';
        trainingProgramsLink.style.fontSize = currentFontSize + 1 + 'px';
      }
    }
  }

  resizeSpanishNavBar(): void {}

  // component start-up
  ngOnInit(): void {
    this.setUpTrainingProgramsBtn();
    window.addEventListener('resize', this.resizeNavBar);
    let app = this;
    setInterval(function (): void {
      let homeLink: HTMLElement = document.getElementById(
        'nav-home'
      ) as HTMLElement;

      if (homeLink.textContent !== 'Home' && !app.isResized) {
        let navLinks: HTMLElement = document.getElementById(
          'nav-links'
        ) as HTMLElement;
        let homeLink: HTMLElement = document.getElementById(
          'nav-training-programs'
        ) as HTMLElement;
        let trainingProgramsLink: HTMLElement = document.getElementById(
          'nav-home'
        ) as HTMLElement;
        let navLogo: HTMLInputElement = document.getElementById(
          'nav-logo'
        ) as HTMLInputElement;
        let windowWidth: number = window.innerWidth;
        let navLinksWidth: number = navLinks?.offsetWidth;
        let logoWidth: number = navLogo?.offsetWidth;
        // Calculates the distance between the nav-bar links and the Logo
        let distanceLogotoLinks: number =
          windowWidth - (navLinksWidth + logoWidth);

        let style = window
          .getComputedStyle(homeLink, null)
          .getPropertyValue('font-size');
        let currentFontSize = parseFloat(style);
        console.log('window width: ' + window.innerWidth);
        console.log('Font-size: ' + currentFontSize);
        console.log('Distance: ' + distanceLogotoLinks);

        if (windowWidth <= 215) {
          homeLink.style.fontSize = 0 + 'px';
          trainingProgramsLink.style.fontSize = 0 + 'px';
        } else if (distanceLogotoLinks <= 5) {
          homeLink.style.fontSize = currentFontSize - 1 + 'px';
          trainingProgramsLink.style.fontSize = currentFontSize - 1 + 'px';
        } else if (distanceLogotoLinks >= 20) {
          if (currentFontSize < 16) {
            homeLink.style.fontSize = currentFontSize + 1 + 'px';
            trainingProgramsLink.style.fontSize = currentFontSize + 1 + 'px';
          }
        } else {
          app.isResized = true; // Done resizing
        }
      }
    }, 1000);
  }
}
