import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private router: Router) {}

  trainingProgramsClick(): void {
    if (
      window.localStorage.getItem('fName') &&
      window.localStorage.getItem('lName')
    ) {
      let navTrainingPrograms = document.getElementById(
        'nav-training-programs'
      );
      //navTrainingPrograms?.setAttribute('href', '#!');
      navTrainingPrograms?.setAttribute('routerLink', '/training-programs');
      this.router.navigateByUrl('/training-programs');
    } else {
      alert('Please enter your name before beginning.');
    }
  }
}
