import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.component.html',
  styleUrls: ['./submission.component.scss'],
})
export class SubmissionComponent implements OnInit {
  constructor(private router: Router) {}
  date: string = this.getCurrentDate();

  // returns the current date using local time
  getCurrentDate() {
    let today: Date = new Date();
    let dd: string = today.getDate().toString();
    let mm: string = (today.getMonth() + 1).toString(); //As January is 0.
    let yyyy: string = today.getFullYear().toString();

    //if (day < 10) dd = '0' + dd.toString();
    //if (month < 10) mm = '0' + mm.toString();
    return mm + '/' + dd + '/' + yyyy;
  }

  ngOnInit(): void {}
}
