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
  questionsArr: questionModule.Question[] = [];
  questionList: string[] = [];
  choicesList: string[][] = [];
  answersList: number[] = [];

  ngOnInit(): void {
    console.log(sessionStorage.getItem('examName'));
    this.examName = sessionStorage.getItem('examName');
    this.setExamData();
    this.createExam();
    console.log(this.questionsArr);
  }

  // Creates each Question object and adds them to the Questions array
  createExam(): void {
    for (let i = 0; i < this.questionList.length; i++) {
      let question: questionModule.Question = new questionModule.Question(
        i + 1,
        this.questionList[i],
        this.choicesList[i],
        this.answersList[i]
      );
      this.questionsArr.push(question);
    }
  }

  // Sets all question, choices, and answer data into arrays for the exam
  setExamData(): void {
    switch (this.examName) {
      case 'PPE: Basic Training':
        this.questionList = [
          'If you have a question about your protective equipment you should ask your supervisor before starting a task.',
          'Which below are considered eye protection?',
          'You should never wear _____ when working',
          'Rubber, vinyl or neoprene gloves provide protection against.',
          'Different forms of hearing protection have different levels of effectiveness.',
          'Goggles are stronger safety glasses.',
          'Wearing hearing protection will usually result in injury.',
          'PPE can reduce your chance of an injury.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['Safety Glasses', 'Goggles', 'Face-shield', 'All of the Above'],
          ['Eye Protection', 'Sandals', 'Hard Hat', 'Work Boots'],
          ['Corrosive Chemicals', 'Splinters', 'Heat', 'None of the Above'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 3, 1, 0, 0, 0, 1, 0];
        break;
      case 'Hazardous Materials Labels':
        this.questionList = [
          'The label contains information about the chemical inside the container.',
          'When is the best time to read a chemical label?',
          'Unlabeled chemical containers are permitted for cleaning supplies.',
          'Which of these instructions are contained on the chemical label?',
          'Health hazards can be found on the chemical label.',
          'Chemical containers under 12 oz. are not required to be labeled',
          'If you transfer a chemical from a large container to a smaller container, the new smaller container must be properly labeled as well.',
          'First aid information should be printed on a chemical label.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['Before you use it', 'After you use it', 'As needed'],
          ['True', 'False'],
          ['Use', 'Disposal', 'Storage', 'All of the above', 'A and B only'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 1, 0, 0, 1, 0, 0];
        break;
      //case '':
      // this.questionList = [
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      // ];

      // this.choicesList = [
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   ['']
      // ];

      // this.answersList = [];
      // break;

      // template

      //case '':
      // this.questionList = [
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      //   '',
      // ];

      // this.choicesList = [
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   [''],
      //   ['']
      // ];

      // this.answersList = [];
      // break;

      default:
        alert('Exam Not Found');
        break;
    }
  }
}
