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

  ngAfterViewInit(): void {
    this.setUpSubmitBtn();
  }

  setUpSubmitBtn(): void {
    let questionsArr = this.questionsArr;

    document
      .getElementById('submitBtn')
      ?.addEventListener('click', function (): void {
        console.log('Checking Answers...');
        let threshold = 1; // 100% Correct
        let correctAnswers = 0;
        for (let i = 0; i < questionsArr.length; i++) {
          let currentChoices = document.getElementsByName(
            questionsArr[i].questionNo.toString()
          );
          for (let j = 0; j < currentChoices.length; j++) {
            let currChoice = currentChoices[j] as HTMLInputElement;
            if (currChoice.checked) {
              if (currChoice.value === questionsArr[i].answer.toString()) {
                console.log(
                  'Q' + questionsArr[i].questionNo.toString() + ' is Correct!'
                );
                correctAnswers += 1;
              } else {
                console.log(
                  questionsArr[i].questionNo.toString() + ' is Wrong!'
                );
              }
            }
          } // end choices for loop
        } // end Q for loop

        console.log('Number of correct answers: ' + correctAnswers);
        let percentage = correctAnswers / questionsArr.length;
        console.log(percentage + '% correct');
      });
  }

  // Checks for corect answer for each question
  // returns boolean dependant on whether the user got ALL answers correct
  checkAnswers(): void {
    console.log('Checking Answers...');
    let threshold = 1; // 100% Correct
    let correctAnswers = 0;
    for (let i = 0; i < this.questionsArr.length; i++) {
      let currentChoices = document.getElementsByName(
        this.questionsArr[i].questionNo.toString()
      );
      for (let j = 0; j < currentChoices.length; j++) {
        let currChoice = currentChoices[j] as HTMLInputElement;
        if (currChoice.checked) {
          if (currChoice.value === this.questionsArr[i].answer.toString()) {
            console.log(
              this.questionsArr[i].questionNo.toString() + ' is Correct!'
            );
          } else {
            console.log(
              this.questionsArr[i].questionNo.toString() + ' is Wrong!'
            );
          }
        }
      } // end choices for loop
    } // end Q for loop
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
          ['Safety glasses', 'Goggles', 'Face-shield', 'All of the Above'],
          ['Eye protection', 'Sandals', 'Hard hat', 'Work boots'],
          ['Corrosive chemicals', 'Splinters', 'Heat', 'None of the Above'],
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
            "Don't use it",
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
      case 'Fire Prevention':
        this.questionList = [
          'Which of the following conditions must be met before using a fire extinguisher to put out a fire?',
          'Which class of fire is ignited by heat generated by the flow of an electric current?',
          'Extensions cords should only be run under mats, rugs or carpet when they are going to be used for a short time and then removed.',
          'Which of the following is NOT required for a fire to start and continue to burn?',
          'Flammable substances must be stored in approved containers.',
          'During hot work operations, all flammable materials within _____ feet should be removed from the area or covered with a fireproof blanket.',
          'Class K fires are fueled by combustible metals such as magnesium, potassium and titanium.',
          'You should only keep the amount of work materials needed for your shift on hand.',
        ];

        this.choicesList = [
          [
            'The fire is in its beginning stages',
            'You are trained and authorized to use a fire extinguisher',
            'You have the appropriate extinguisher for the class of fire',
            'You can put out the fire without risking your life',
            'All of the above',
          ],
          ['Class A', 'Class B', 'Class C'],
          ['True', 'False'],
          ['An ignition source', 'Fuel', 'Oxygen', 'Carbon dioxide'],
          ['True', 'False'],
          ['10', '15', '35'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [];
        break;
      case 'First Aid':
        this.questionList = [
          'The definition of a "compound" fracture is one that _________.',
          'For most cases of "shock" you should wrap something around the victim to keep them warm.',
          'An automatic external defibrillator (AED), is used with what type of condition?',
          'The procedure that is used to remove blockages in the windpipe is known as the ________.',
          "Heat stroke occurs when a person gets so hot that they can't cool downnormally, though sweating.",
          'The best treatment for a blister is to puncture it and drain the fluid underneath, then cover it with a bandage.',
          'The best treatment for most burns is _________.',
        ];

        this.choicesList = [
          [
            'Involves an open wound',
            'Does not involve an open wound',
            'None of the above',
          ],
          ['True', 'False'],
          ['Choking', 'Cardiac arrest', 'Shock'],
          ['Heart-lung Maneuver', 'Heimlich Manuever', 'Hug-of-Life'],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Soaking them in water, then bandaging them',
            'Applying an ointment',
            'Leaving them as is',
          ],
        ];

        this.answersList = [0, 0, 1, 1, 0, 1, 0];
        break;
      case 'Basic Electrical Safety':
        this.questionList = [
          'Insulators like wood can become conductors when they become wet.',
          'Which of the following are considered conductors?',
          'Electrical hazards only affects professional electricians.',
          'Which of these can increase the chance of electric shock?',
          'Voltage and Amperage mean the same thing.',
          'GFCIs serve a similar purpose as a fuse, they break the current in the event of overload or short circuit.',
          'The human body is also a good conductor of electricity.',
          'Alternating current (AC) needs to be grounded, either in a home or a business.',
          'Insulators do the same thing that conductors do.',
          'Water is a great conductor of electricity.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['Copper', 'Silver', 'Aluminum', 'All of the above'],
          ['True', 'False'],
          [
            'Loose wires',
            'Jewelry',
            'Wet hands',
            'All of the above',
            'A and C only',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 3, 2, 3, 2, 0, 0, 0, 1, 0];
        break;

      case 'Slips, Trips, & Falls':
        this.questionList = [
          'Which is an example of “best practices” which can help prevent slips, trips, and falls?',
          'A key to preventing injuries caused by slips, trips and falls is recognizing and respecting potential hazards in your work environment.',
          'Which is a common cause of trips in the work environment?',
          'Good housekeeping is an important element of safe work practices for preventing slips, trips and falls.',
        ];

        this.choicesList = [
          [
            'Good housekeeping',
            'Closing all drawers and cabinet doors',
            'Cleaning up spills immediately',
            'Wearing proper shoes',
            'All of the above',
          ],
          ['True', 'False'],
          [
            'Uneven surfaces',
            'Non-secured cables and cords',
            'Obstructed views',
            'Changes in surface elevations',
            'All of the above',
          ],
          ['True', 'False'],
        ];

        this.answersList = [4, 0, 4, 0];
        break;
      case 'Trenching & Excavation':
        this.questionList = [
          'Trench cave-ins are predictable and preventable.',
          'A person buried under only a couple of feet of soil can experience enough pressure to cause suffocation.',
          'Training and understanding the trenching and shoring regulations are keys to working safely in trenches.',
          'A trench refers to a narrow excavation made below the surface of the ground where the width is greater than the depth.',
          'It is not necessary for the competent person to conduct an inspection after every rain storm or other weather event.',
          'Trench cave-in fatalities are caused by __________.',
          'If a trench is more than _____ feet in depth, there must be a protective system in place while workers are in the excavation.',
          'A competent person must classify the soil by using ________ test.',
          'Soil is heavy. A cubic foot generally weighs as much as _____ pounds or more.',
          'It is not permissible to use backhoes, breakers, digging bars or other metal tools to locate or work around utilities.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Lack of trench protection',
            'Ignoring hazards',
            'Poor judgement',
            'All of the above',
          ],
          ['3', '4', '5', '6'],
          [
            'A computerized',
            'One visual and one computerized',
            'One visual and one manual',
            'Strength',
          ],
          ['50', '75', '80', '100'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 0, 1, 1, 3, 2, 2, 3, 0];
        break;

      case 'Fall Protection':
        this.questionList = [
          'How many people are injured in falls each year?',
          'Most falls from height are preventable.',
          'Which of these are considered fall protection?',
          'In construction, fall protection is required for working at heights over _____ feet.',
          'In certain situations, it is safe to tie off back to your lanyard.',
          'How often must fall protection equipment be re-certified?',
          'Falling with loose leg straps can be very painful and cause injuries.',
          'Fall arrest systems are not required on any type of aerial lift equipment.',
          'Fall from ladders can be deadly.',
          'Tying off improperly is a common cause of injury or death in construction.',
        ];

        this.choicesList = [
          ['200', '2000', '20,000', '200,000'],
          ['True', 'False'],
          [
            'Guard rails',
            'Covers',
            'Harness and lanyard',
            'All of the above',
            'A and B only',
          ],
          ['2', '4', '6', '8'],
          ['True', 'False'],
          ['Once a month', 'Every 6 months', 'Every year', 'Every two years'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [3, 0, 3, 2, 1, 1, 0, 1, 0, 0];
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

      default:
        alert('Exam Not Found');
        break;
    }
  }
}
