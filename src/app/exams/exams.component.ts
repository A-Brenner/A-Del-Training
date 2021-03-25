import { Component, OnInit } from '@angular/core';
import { questionModule } from './question';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  constructor() {}
  examName: any = null;

  ngOnInit(): void {
    console.log(sessionStorage.getItem('examName'));
    this.examName = sessionStorage.getItem('examName');
  }
}
