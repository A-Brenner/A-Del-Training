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
    this.setUpFormSubmission();
  }

  setUpFormSubmission(): void {
    let submissionForm: HTMLFormElement = document.querySelector(
      '.email-form'
    ) as HTMLFormElement;
    let router: Router = this.router;
    //submissionForm.onsubmit = this.sendEmail;
    submissionForm.onsubmit = function (e: Event) {
      let fnameEl: HTMLInputElement = document.getElementById(
        'fname'
      ) as HTMLInputElement;
      let lnameEl: HTMLInputElement = document.getElementById(
        'lname'
      ) as HTMLInputElement;
      let empIdEl: HTMLInputElement = document.getElementById(
        'emp-id'
      ) as HTMLInputElement;
      let messageEl: HTMLTextAreaElement = document.getElementById(
        'message'
      ) as HTMLTextAreaElement;

      // returns the current date using local time
      let today: Date = new Date();
      let dd: string = today.getDate().toString();
      let mm: string = (today.getMonth() + 1).toString(); //As January is 0.
      let yyyy: string = today.getFullYear().toString();
      let curDate = mm + '/' + dd + '/' + yyyy;

      let tempParams = {
        fname: fnameEl.value,
        lname: lnameEl.value,
        trainingProgram: localStorage.getItem('latestProgram'),
        id: empIdEl.value,
        date: curDate,
        message: messageEl.value,
      };

      console.log(
        `tempParams: \n${tempParams.fname} \n${tempParams.lname} \n${tempParams.trainingProgram} \n${tempParams.id} \n${tempParams.date} \n${tempParams.message}`
      );

      e.preventDefault();
      emailjs
        .send(
          'service_fogijma',
          'template_r090tb8',
          tempParams,
          'user_NZvL7kVGCJeEl7XwEVdFH'
        )
        .then(
          function (response) {
            console.log('SUCCESS!', response.status, response.text);
            router.navigateByUrl(
              '/training-programs/sections/submission/congratulations'
            );
          },
          function (error) {
            console.log('FAILED...', error);
          }
        );
    };
  }

  public sendEmail(e: Event) {
    let fnameEl: HTMLInputElement = document.getElementById(
      'fname'
    ) as HTMLInputElement;
    let lnameEl: HTMLInputElement = document.getElementById(
      'lname'
    ) as HTMLInputElement;
    let empIdEl: HTMLInputElement = document.getElementById(
      'emp-id'
    ) as HTMLInputElement;
    let messageEl: HTMLTextAreaElement = document.getElementById(
      'message'
    ) as HTMLTextAreaElement;

    // returns the current date using local time
    let today: Date = new Date();
    let dd: string = today.getDate().toString();
    let mm: string = (today.getMonth() + 1).toString(); //As January is 0.
    let yyyy: string = today.getFullYear().toString();
    let curDate = mm + '/' + dd + '/' + yyyy;

    let tempParams = {
      fname: fnameEl.value,
      lname: lnameEl.value,
      trainingProgram: localStorage.getItem('latestProgram'),
      id: empIdEl.value,
      date: curDate,
      message: messageEl.value,
    };

    console.log(
      `tempParams: \n${tempParams.fname} \n${tempParams.lname} \n${tempParams.trainingProgram} \n${tempParams.id} \n${tempParams.date} \n${tempParams.message}`
    );

    e.preventDefault();
    emailjs
      .send(
        'service_fogijma',
        'template_r090tb8',
        tempParams,
        'user_NZvL7kVGCJeEl7XwEVdFH'
      )
      .then(
        function (response) {
          console.log('SUCCESS!', response.status, response.text);
        },
        function (error) {
          console.log('FAILED...', error);
        }
      );
  }
}
