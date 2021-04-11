import { Component, OnInit } from '@angular/core';
import { questionModule } from './question';
import { Router } from '@angular/router';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  constructor(private router: Router) {}
  examName: any = null;
  questionsArr: questionModule.Question[] = [];
  questionList: string[] = [];
  choicesList: string[][] = [];
  answersList: number[] = [];
  results: string = '';

  ngOnInit(): void {
    console.log(sessionStorage.getItem('examName'));
    this.examName = sessionStorage.getItem('examName');
    this.setExamData();
    this.createExam();
    console.log(this.questionsArr);
  }

  ngAfterViewInit(): void {
    this.setUpSubmitBtn();
    this.setUpRetryBtn();
  }

  setUpSubmitBtn(): void {
    let questionsArr = this.questionsArr;
    let checkCompletion = this.checkCompletion;
    let router = this.router;
    let examName = this.examName;

    document
      .getElementById('submitBtn')
      ?.addEventListener('click', function (): void {
        // Checks for corect answer for each question
        // returns boolean dependant on whether the user got ALL answers correct
        console.log('Checking Answers...');
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

        checkCompletion(correctAnswers, questionsArr, router, examName);
      });
  }

  // Check is the number of correct answers meets the requirement
  // IF SO - route user back to the sections page
  // IF NOT - retry
  checkCompletion(
    correctAnswers: number,
    questionsArr: questionModule.Question[],
    router: Router,
    examName: string
  ): void {
    let threshold = 1; // 100% Correct
    console.log('Number of correct answers: ' + correctAnswers);
    let percentage = correctAnswers / questionsArr.length;
    console.log(percentage + '% correct');

    if (correctAnswers / questionsArr.length >= threshold) {
      console.log('You passed the exam!');
      localStorage.setItem(examName, 'true');
      router.navigateByUrl('/training-programs/sections');
      // router back to sections page
    } else {
      console.log('You FAILED the exam :(');
      let modal = document.querySelector('.modal') as HTMLElement;
      modal.style.display = 'block';
      let results = document.querySelector('.results') as HTMLElement;
      //results.textContent = `You have selected ${correctAnswers}/${questionsArr.length} or ${percentage}% correct answers.\r\nYou need at least 100% to pass the exam.`;
      results.textContent = `You have selected ${correctAnswers}/${questionsArr.length} correct answers.`;
    }
  }

  setUpRetryBtn(): void {
    //let questionsArr = this.questionsArr;
    let modal = document.querySelector('.modal') as HTMLElement;

    document
      .getElementById('retryBtn')
      ?.addEventListener('click', function (): void {
        modal.style.display = 'none';
      });

    window.addEventListener('click', function (event): void {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
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
      case "PPE: It's Your Call":
        this.questionList = [
          'When noise levels reach 85 decibels or above, hearing protection is required.',
          'Which of the following can cause a severe eye injury if the proper protection is not worn?',
          'PPE offers little or no protection if worn improperly.',
          'Which of the following is a valid reason for not wearing PPE when required?',
          'How often should you inspect your PPE to ensure it’s in good condition and functioning properly?',
          'What purpose does a hard hat serve?',
          'Whose responsibility is it to wear the required PPE?',
          'Whose responsibility is it to provide the required PPE?',
          'Which of the following are considered PPE?',
          'When working with chemicals, safety glasses offer adequate eye protection.',
          'Who makes the choice to wear PPE when required?',
          'All gloves offer the same basic level of protection.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['Flying metal chips', 'Nails', 'Chemicals', 'All of the above'],
          ['True', 'False'],
          [
            'You are busy',
            'You are just doing one quick job',
            "It's uncomfortable",
            'None of the above',
          ],
          ['Before each use', 'Once a week', 'Once a month', 'When needed'],
          [
            'Protection from falling objects',
            'Protection from overhead hazards',
            'Hearing protection',
            'A and B',
          ],
          ['Yours', 'The company', 'OSHA', 'B and C'],
          ['Yours', 'The company', 'OSHA', 'B and C'],
          ['Safety glasses', 'Ear plugs', 'Gloves', 'All of the above'],
          ['True', 'False'],
          ['You', 'Your company', 'Your supervisor', 'OSHA'],
          ['True', 'False'],
        ];

        this.answersList = [0, 3, 0, 3, 0, 3, 0, 1, 3, 1, 0, 1];
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
          'How many points of contact should you maintain when climbing or descending a ladder?',
          'All slips and falls can be tracked back to five basic causes.',
          'Which of the following can cause a slip and fall injury?',
          'Shoes that are appropriate in summer may not be appropriate in winter months.',
          'Which of the following should a good work shoe have?',
          'There are no slip and fall hazards in the leasing office.',
          'Preventing slips and falls takes commitment from _________.',
          'Traction is irrelevant when walking on snow and ice and overshoes are ineffective.',
          'Carrying items can impact your balance and cause you to lose footing.',
          'You should always use the handrail when using stairs.',
        ];

        this.choicesList = [
          ['1', '2', '3', '4'],
          ['True', 'False'],
          [
            'Stepping off a curb',
            'Grease on concrete or blacktop',
            'Loose carpeting',
            'All of the above',
          ],
          ['True', 'False'],
          [
            'Covered toes',
            'Firm but comfortable fit',
            'Slip-resistant sole',
            'All of the above',
          ],
          ['True', 'False'],
          ['You', 'Co-workers', 'Everyone', 'None of the above'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [2, 0, 3, 0, 3, 1, 2, 1, 0, 0];
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

      case 'Confined Space':
        this.questionList = [
          'A confined space is not primarily designed or intended for continuous human occupancy and has limited or restricted entrance or exit.',
          'Which of these are hazards in a Confined Space?',
          'Confined Spaces have special hazards not normally present in other work environments.',
          'Risk Assessments are required before entering any Confined Space.',
          'A permit is required to enter every confined space.',
          'Confined Spaces must be marked with proper signage.',
          'Poor air quality is the most common hazard in a Confined Space.',
          'People who enter confined spaces for rescue purposes can become a victim themselves.',
          'Air Testing is only required for Permit Required spaces.',
          'Ventilation of a confined space can help improve air quality.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['Poor air quality', 'Collapse', 'Slips & Falls', 'All of the above'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 3, 0, 0, 1, 0, 0, 0, 1, 0];
        break;

      case 'Crystalline Silica Safety':
        this.questionList = [
          'OSHA states that a _________ person must be head of this program.',
          'Any worker exposed to silica for 30 or more days per year must be offered a medical exam at least once every ______.',
          'Respirable crystalline silica are the small particles created when',
          'You should always',
          'What are the four engineering controls that can be put in place?',
          'If you are required to use respirators....',
          'Silicosis is a _______',
          'Crystalline silica, also referred to as Silicon dioxide, is also know as',
        ];

        this.choicesList = [
          ['Boss', 'Employee', 'Geologist', 'Competent'],
          ['Two years', 'Three years', 'Five years', 'Four years'],
          ['Eating', 'Running', 'Cutting and crushing stone', 'Sleeping'],
          [
            'Be sure the respirator you are using is rated for crystalline silica',
            'Work fast without PPE',
            'Sleep after inhaling dust',
            'Check the weathr report for rain',
          ],
          [
            'Substitution, isolation, ventilation, and dust suppression',
            'Substitution, solutions, mask control, and PPE',
            'Ventilation, PPE, dust catchers, and lights',
            'None of the above',
          ],
          [
            "You're going to need an extra strong helmet",
            'You should ask what brand is good',
            'You should buy one',
            'Your company will need to have a written respiratory program in place',
          ],
          ['Incurable lung disease', 'Work protocol', 'Type of rock', 'Dust'],
          ['S100', 's222', 'SiO2', 'E40'],
        ];

        this.answersList = [3, 1, 2, 0, 0, 3, 0, 2];
        break;

      case 'Machine Guarding':
        this.questionList = [
          'Electrical interlocks are often used in place of machine guarding to protect employees.',
          'Long hair, loose clothing and jewelry may be worn around moving machinery as long as you keep these items away from the point of operation.',
          'Fixed guards are stationary protectors that are easy to remove.',
          'You should re-check the position of adjustable guarding when the size or shape of the working material changes.',
          'Pressure-sensitive mats are only used to shut down a machine when a worker steps onto the mat.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [1, 1, 1, 0, 1];
        break;

      case 'Driving Safety':
        this.questionList = [
          'In inclement weather, you should increase your following distance.',
          'What is the minimum safe following distance?',
          'Who has a responsibility to drive safely?',
          'How far should you look ahead in traffic to effectively be able to react to changing circumstances?',
          'Using your turn signal is a good way to inform other drivers of your intentions.',
          'Intersections are where most accidents occur.',
          'Every vehicle has a blind spot.',
          'You should stare and focus your attention straight ahead at all times to avoid distraction.',
          'Who is responsible for your safety?',
          "You should be aware of what's going on _________ of your vehicle at all times.",
        ];

        this.choicesList = [
          ['True', 'False'],
          ['2 seconds', '3 seconds', '4 seconds', '6 seconds'],
          [
            'You',
            'Professional  drivers',
            'People who drive as part of their job',
            'All of the above',
            'B and C only',
          ],
          ['4 seconds', '6 seconds', '8 seconds', '10 seconds'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['You', 'The other driver', 'Highway patrol', 'OSHA'],
          ['In front', 'Behind', 'To the sides', 'All of the above'],
        ];

        this.answersList = [0, 2, 3, 3, 0, 0, 0, 1, 0, 3];
        break;

      case 'Rigging & Load Securement':
        this.questionList = [
          'Never leave a suspended load unattended.',
          'To signal an emergency stop, extend both arms out with palms down, and move your arms horizontally.',
          'It is safe to use a hook with a bent safety latch.',
          'Which of the following is not a type of hitch used in rigging operations',
          'The most common hazard that a rigger faces is electrocution',
          'Slings are made of which of the following materials?',
          'A chain sling should never be used to lift heavy loads.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['Basket', 'Choker', 'Horizontal', 'Vertical'],
          ['True', 'False'],
          [
            'Wire rope',
            'Chain',
            'Metal mesh',
            'Synthetic fabric',
            'All of the above',
          ],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 1, 2, 0, 4, 1];
        break;

      case 'Hand & Power Tool Safety':
        this.questionList = [
          'Which of these are considered hand tools?',
          "If you don't have a chisel, a screwdriver may be used safely.",
          'How often should you inspect your hand or power tools.',
          'Frayed electrical cords should be taped over and used.',
          'Loose clothing can get caught in moving parts of tools.',
          'Never carry a power tool by its cord.',
          'To unplug a powered tool from an outlet, you should pull on the ____________.',
          'You should unplug tools before performing any maintenance.',
          'Good footing and balance can help keep you safe while using hand & power tools.',
          'Many injuries occur from using tools and getting distracted.',
        ];

        this.choicesList = [
          ['Pliers', 'Wrench', 'Screwdriver', 'All of the above'],
          ['True', 'False'],
          ['Before each use', 'Weekly', 'Monthly', 'As needed'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['Cord', 'Plug'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [3, 1, 0, 1, 0, 0, 1, 0, 0, 0];
        break;

      case 'Heat Stress':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
          [''],
        ];

        this.answersList = [];
        break;

      default:
        alert('Exam Not Found');
        break;
    }
  }
}
