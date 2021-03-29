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
      // FIELD WORKER SECTIONS
      case 'PPE: Basic Training':
        this.questionList = [
          'If you have a question about your protective equipment you should ask your supervisor before starting a task.',
          'Which below are considered eye protection?',
          'You should never wear _____ when working.',
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
          'Chemical containers under 12 oz. are not required to be labeled.',
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
      case 'GHS: Safety Data Sheets':
        this.questionList = [
          'What does SDS stand for?',
          'SDS contain information on chemicals you need to know.',
          'Which of these are contained on an SDS?',
          'SDS are usually available in printed for and online.',
          'Generally, the information in an SDS is much more technical than is normally provided on labels.',
          'First Aid information is only on flammable chemical SDS.',
          'Direction on how to _____________ a chemical are present on the SDS.',
          'SDS’s are available to anyone asking for the information.',
          'An SDS carries more information than the chemical container label.',
          'Basic cleaning chemicals do not require an SDS to be maintained on site.',
        ];

        this.choicesList = [
          [
            'Safet Data Service',
            'Standard Data Sheet',
            'Safety Data Sheet',
            'Safety Data Service',
          ],
          ['True', 'False'],
          [
            'Ingredients',
            'Hazards',
            'Price',
            'All of the above',
            'A and B only',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['Use', 'Store', 'Dispose', 'All of the above', 'A and B only'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [2, 0, 4, 0, 0, 1, 3, 0, 0, 1];
        break;

      case 'Ladder Safety':
        this.questionList = [
          'Falls from ladders usually result in only minor injuries.',
          'If a ladder cannot be found, use a chair or table to reach the item you need.',
          'How often should you inspect a ladder?',
          'If you notice a damaged or defective ladder, what should you do?',
          'Never use metal ladders around electrical equipment',
          'You can stand on the top two steps of the ladder only if you cannot reach the item any other way.',
          'The “Belt Buckle” rule means _____________.',
          'How many feet should the ladder be away from the support on a straight ladder extended 12 feet?',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          [
            'Every time before you inspect a ladder',
            'Once a shift',
            'Once a week',
            'Once a month',
          ],
          [
            'Use it anyway',
            'Report it to your supervisor',
            "Don't us it",
            'Both B and C',
          ],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Keep your belt buck;e touching the ladder at all times',
            'Never wear a belt buckle when workong on a ladder',
            "Don't lean where your belt buckle is outside the ladder rails",
            'None of the above',
          ],
          ['3 inches', '1 foot', '3 feet', '4 feet'],
        ];

        this.answersList = [1, 1, 0, 3, 0, 1, 2, 2];
        break;

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
