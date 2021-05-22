import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private router: Router) {}

  title: string = 'A-Del Training';
  fName: any = '';
  hasName: boolean = this.doesNameExist();

  // Checks to see if name has already been saved in local storage
  doesNameExist(): boolean {
    if (
      window.localStorage.getItem('fName') &&
      window.localStorage.getItem('lName')
    ) {
      this.fName = window.localStorage.getItem('fName');
      return true;
    } else {
      return false;
    }
  }

  setLoginBtnMethod(): void {
    console.log('User has name? ' + this.hasName);
    let router = this.router;

    if (this.hasName) {
      // Continue Training (User is already registered)

      let continueBtn: HTMLButtonElement = document.querySelector(
        '.login-btn'
      ) as HTMLButtonElement;
      continueBtn.addEventListener('click', function (): void {
        if (window.localStorage.getItem('latestProgram')) {
          // Go directly to the section user last visited if possible
          router.navigateByUrl('/training-programs/sections');
        } else {
          // Go to training programs page
          router.navigateByUrl('/training-programs');
        }
      });
    } else {
      // Register to Begin Training (New User)

      let loginForm: HTMLFormElement = document.querySelector(
        '.login-form'
      ) as HTMLFormElement;
      loginForm.onsubmit = function () {
        console.log('Logging in........');

        // Save name to local storage
        let fName = (<HTMLInputElement>document.getElementById('fname')).value;
        let lName = (<HTMLInputElement>document.getElementById('lname')).value;
        window.localStorage.setItem('fName', fName);
        window.localStorage.setItem('lName', lName);
        // Go to training programs page
        router.navigateByUrl('/training-programs');
      };
    }
  }

  // component start-up
  ngOnInit(): void {
    //window.localStorage.clear();
  }

  ngAfterViewInit(): void {
    this.setLoginBtnMethod();
  }
}
