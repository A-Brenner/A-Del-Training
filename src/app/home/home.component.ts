import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: string = 'A-Del Training';
  fName: string = '';
  lName: string = '';
  hasName: boolean = false;
  lastVisitedProgram: any = '';
  constructor(private router: Router) {}

  // onClick Method
  // Takes user to the Industries page
  beginTrainingClick(): void {
    this.saveName();
    console.log(window.localStorage.getItem('fName'));
    console.log(window.localStorage.getItem('lName'));
    this.hasName = this.doesNameExist();

    if (this.hasName) {
      this.router.navigateByUrl('/training-programs');
    } else {
      alert('Please enter your name before beginning.');
    }
  }

  continueTraining(): void {
    this.lastVisitedProgram = window.localStorage.getItem('latestProgram');
    this.router.navigateByUrl('/training-programs/sections');
  }

  // Save user's name to local storage
  // Only if inout is NOT blank && NOT default values
  saveName(): void {
    this.fName = (<HTMLInputElement>document.getElementById('fname')).value;
    this.lName = (<HTMLInputElement>document.getElementById('lname')).value;

    // Makes sure the user actually entered their name before saving to local storage
    if (
      this.fName !== 'First Name' &&
      this.fName !== '' &&
      this.lName !== 'Last Name' &&
      this.lName !== ''
    ) {
      window.localStorage.setItem('fName', this.fName);
      window.localStorage.setItem('lName', this.lName);
    }
  }

  // Checks to see if name has already been saved in local storage
  doesNameExist(): boolean {
    if (
      window.localStorage.getItem('fName') &&
      window.localStorage.getItem('lName')
    ) {
      return true;
    } else {
      return false;
    }
  }

  // component start-up
  ngOnInit(): void {
    //window.localStorage.clear();
    this.hasName = this.doesNameExist();
    console.log(document.getElementById('nav-training-programs'));
  }
}
