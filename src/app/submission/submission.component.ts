import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    let trainingProgram: any = localStorage.getItem('latestProgram');

    if (localStorage.getItem(trainingProgram + 'Submitted')) {
      this.router.navigateByUrl(
        '/training-programs/sections/submission/congratulations'
      );
    } else if (localStorage.getItem(trainingProgram + 'Completed')) {
      this.setUpFormSubmission();
    } else {
      this.router.navigateByUrl('/training-programs/sections');
    }
  }

  setUpFormSubmission(): void {
    let submissionForm: HTMLFormElement = document.querySelector(
      '.email-form'
    ) as HTMLFormElement;
    let submitBtn: HTMLInputElement = document.getElementById(
      'submit-btn'
    ) as HTMLInputElement;
    let router: Router = this.router;
    let getCurDate = this.getCurrentDate;
    let getTrainingProgram = this.getTrainingProgram;

    submissionForm.onsubmit = function (e: Event) {
      let fnameEl: HTMLInputElement = document.getElementById(
        'fname'
      ) as HTMLInputElement;
      let lnameEl: HTMLInputElement = document.getElementById(
        'lname'
      ) as HTMLInputElement;
      let messageEl: HTMLTextAreaElement = document.getElementById(
        'message'
      ) as HTMLTextAreaElement;

      // disable submit button to prevent multiple emails from being sent
      submitBtn.style.opacity = '0.5';
      submitBtn.style.pointerEvents = 'none';

      let tempParams = {
        fname: fnameEl.value,
        lname: lnameEl.value,
        trainingProgram: getTrainingProgram(),
        date: getCurDate(),
        message: messageEl.value,
      };

      e.preventDefault();
      emailjs
        .send(
          'service_a-del-safety',
          'template_r090tb8',
          tempParams,
          'user_NZvL7kVGCJeEl7XwEVdFH'
        )
        .then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text);
            localStorage.setItem(
              localStorage.getItem('latestProgram') + 'Submitted',
              'true'
            );
            router.navigateByUrl(
              '/training-programs/sections/submission/congratulations'
            );
          },
          function (error) {
            console.log('FAILED...', error);
            submitBtn.style.opacity = '1.0';
            submitBtn.style.pointerEvents = 'initial';
          }
        );
    };
  }

  // returns the current date using local time
  getCurrentDate(): string {
    let today: Date = new Date();
    let dd: string = today.getDate().toString();
    let mm: string = (today.getMonth() + 1).toString(); //As January is 0.
    let yyyy: string = today.getFullYear().toString();
    return mm + '/' + dd + '/' + yyyy;
  }

  getTrainingProgram(): string {
    switch (localStorage.getItem('latestProgram')) {
      case 'newEmployees': {
        return 'New Employees';
      }
      case 'officeEmployees': {
        return 'Office Employees';
      }
      case 'fieldWorkers': {
        return 'Field Workers';
      }
      case 'foreman': {
        return 'Foreman';
      }
      case 'shopWorkers': {
        return 'Shop Workers';
      }
      case 'truckDrivers': {
        return 'Truck Drivers';
      }
      default: {
        return 'Training Program Unknown';
      }
    }
  }
}
