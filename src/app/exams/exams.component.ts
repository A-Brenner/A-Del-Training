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
    this.examName = sessionStorage.getItem('examName');
    this.setExamData();
    this.createExam();
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
        let correctAnswers = 0;
        for (let i = 0; i < questionsArr.length; i++) {
          let currentChoices = document.getElementsByName(
            questionsArr[i].questionNo.toString()
          );
          for (let j = 0; j < currentChoices.length; j++) {
            let currChoice = currentChoices[j] as HTMLInputElement;
            if (currChoice.checked) {
              if (currChoice.value === questionsArr[i].answer.toString()) {
                correctAnswers += 1;
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
    let percentage = correctAnswers / questionsArr.length;

    if (correctAnswers / questionsArr.length >= threshold) {
      localStorage.setItem(examName, 'true');
      router.navigateByUrl('/training-programs/sections');
      // router back to sections page
    } else {
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
      // NEW EMPLOYEES SECTIONS
      case 'Safety Orientation':
        this.questionList = [
          'Hardhats and safety glasses should be worn at all times on the jobsite regardless of the task at hand.',
          'When climbing a ladder, you must maintain four points of contact at all times.',
          'Which soil type is the least stable?',
          'What is the most common type of accident suffered by operators of heavy equipment?',
          'Only electrical workers and supervisory workers are allowed to enter site electrical rooms.',
          'How much does an average cubic yard of dirt weigh?',
          'More than eight of every 10 construction site accidents is the fault of _______________.',
          'Tie-off points used for fall protection must be able to hold ____________ pounds per employee.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['Type A', 'Type B', 'Type C'],
          [
            'Collisions with other vehicles',
            'Injuries that occur when climbing on and off the equipment',
            'Striking pedestrians not visible in their paths',
          ],
          ['True', 'False'],
          ['250 pounds', '1,000 pounds', '2,500 pounds'],
          [
            'Equipment failure',
            'Employee error',
            'Lack of employee supervisor',
          ],
          ['500', '1,000', '5,000'],
        ];

        this.answersList = [0, 1, 2, 1, 0, 2, 1, 2];
        break;
      case 'Drug & Alcohol Abuse':
        this.questionList = [
          'The "residual effect" of a substance that an employee abuses can last hours or even days after they used it.',
          'The term "substance abuse" should be applied only to the use of drugs that are illegal.',
          'Nearly half of all workplace accidents are caused by workers who are drinking on the job.',
          'Alcohol impairment starts with the first drink.',
          'Prescription drugs are never as physically addictive as illegal drugs.',
          'Heroin users often experience persistent drowsiness and "fuzzy" thinking, which can expose them and their coworkers to the risk of accidents and injuries.',
          'Many people find that using drugs or alcohol helps them to solve their problems.',
          'People who become addicted to medications may consider themselves to be "teetotalers" because they don\'t use alcohol or illegal drugs.',
          'What a substance abuser does under the influence of drugs or alcohol can endanger them, their coworkers and anyone else they come into contact with.',
          'People are more likely to develop a psychological drug dependence when they abuse "hard" drugs like cocaine or heroin rather than alcohol or prescription drugs.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [];
        break;

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

      case 'Driver Safety':
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
        this.questionList = [
          'How much water should you drink per hour?',
          'Your body has way of remembering heat illness and is easily affected by the heat the next day.',
          'You should drink water after you drink a sports drink.',
          'When will water be provided for you?',
          'What should you do to prevent heat stress?',
          'How can you prevent heat stress?',
          'How long does it take to get acclimated to the heat?',
        ];

        this.choicesList = [
          ['1 gallon', '1 quart', '1 half gallon', '1 cup'],
          ['True', 'False'],
          ['True', 'False'],
          [
            "When it's over 80 degrees",
            'Between April 1st & October 1',
            'All year around',
          ],
          [
            'Avoid Caffeine',
            'Avoid sugary / salty foods',
            'Avoid Alchohol',
            'All of the above',
          ],
          ['Get in the shade', 'Rest', 'Drink water', 'All of the above'],
          ['1 day', '2 to 4 hours', '4 days to 2 weeks', '1 month'],
        ];

        this.answersList = [1, 0, 0, 2, 3, 3, 2];
        break;

      // ** SHOP WORKERS & MECHANICS **
      case 'Aerial Lift Safety':
        this.questionList = [
          'The operating controls on the ground unit are to assist the operator _______________.',
          'When operating around other equipment take the necessary precautions to prevent a collision by use of warnings such as:',
          'With the side covers removed, check the hydraulic and fuel systems for ______________ and any other components your company may require.',
          'While each type of lift has several safety precautions, basic safe operating procedures should be followed ______________ operation on any aerial platform.',
          'If any of the controls do not work properly or there is any other malfunction:',
          'If you have a history of dizziness, seizures or are uncomfortable working above ground you should:',
          'M.S.A.D. stands for:',
          'If you discover any problems while operating the lift:',
          'To use the platform you must first make sure that the operator manual for the model and type of lift is ______________.',
          'The Aerial Lift should be inspected ______________.',
        ];

        this.choicesList = [
          [
            'In case of an emergency',
            'If they need to take a break',
            'If they need assistance from a co-worker',
            'If they need a better view from the ground',
          ],
          ['Flags', 'Flashing lights', 'Barricades', 'All of the above'],
          [
            'Leaks',
            'Cables and wiring harness',
            'Fan belts',
            'All of the above',
          ],
          ['During', 'Before', 'After', 'All of the above'],
          [
            'Try to fix the problem yourself',
            'Ask a co-worker for help',
            'Tag out the machine and report the problem',
            'Find a new machine to use',
          ],
          [
            'Ask a co-worker for help',
            "Get a doctor's note",
            'Not operate aerial lifts',
            'Have someone supervise you while operating',
          ],
          [
            'Minimum Safe Approach Distance',
            'Maximum Safe Approach Distance',
            'Maximum Safe Approval Distance',
            'Majority Safe Approach Distance',
          ],
          [
            'Look in your manual',
            'Report them to your supervisor',
            'Ask your co-workers',
            'Figure out the problem yourself',
          ],
          [
            'On the equipment',
            'Up to date',
            'Passed around to each employee',
            'None of the above',
          ],
          [
            'Once a week',
            'Before use each day',
            'At the beginning of each shift',
            'B and C',
          ],
        ];

        this.answersList = [0, 3, 3, 3, 2, 2, 0, 1, 0, 3];
        break;

      case 'Forklift Safety':
        this.questionList = [
          'When the combined center of gravity shifts outside of the stability triangle, the forklift will be unstable and may tip over.',
          'You should back down a ramp when carrying a load on a lift truck.',
          'When traveling in areas frequented by pedestrians, the pedestrians always have the right of way.',
          'A forklift weighs ___________ a typical car.',
          'What should you do before lifting a load?',
          'Forklift operators must be trained on the specific type of powered industrial they will be certified to operate.',
          'The distance from the mast to the center of gravity of the load is called the __________.',
          'When following another vehicle, you should maintain a _______ truck distance between you and the other vehicle.',
          'The pre-operational inspection of a forklift should be performed once a week.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['The same as', 'More than', 'Less than'],
          [
            'Make sure the load is secure',
            "Make sure the load doesn't exceed the forklift's lifting capacity",
            'Both A and B',
          ],
          ['True', 'False'],
          ['Load midpoint', 'Load interior', 'Load center'],
          ['One', 'Two', 'Three'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 0, 1, 2, 0, 2, 2, 1];
        break;

      case 'Welding & Cutting':
        this.questionList = [
          'When working in tight quarters, you should work and move a little __________ than normal.',
          'Welding jobs that must be performed on objects outside the designated area require a hot work permit.',
          'You only need to make sure you have adequate ventilation when welding in confined areas where fumes may accumulate.',
          'Prior to a hot work operation, all ignitable debris within a _______ radius of the worksite should be swept up.',
          'Before using the welding machine, you should make sure it is properly grounded and in good working order.',
          'High-top leather safety boots offer the best foot protection while welding.',
          'Most welding gloves are effective in preventing burns when handling extremely hot materials.',
          'Safety glasses with side shields should always be worn under your welding helmet.',
          'Part of good housekeeping is returning supplies and equipment to their proper storage area when the job is complete.',
        ];

        this.choicesList = [
          ['Faster', 'Slower'],
          ['True', 'False'],
          ['True', 'False'],
          ['10', '15', '35'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [1, 0, 1, 2, 0, 0, 1, 0, 0];
        break;

      case 'Arc Flash':
        this.questionList = [
          'Arc flash is caused by an uncontrolled current passing through the air',
          'Exposures to arc flash can be fatal.',
          'Which of these can cause arc flash?',
          'When a conductive object gets too close to an exposed source of current, arc flash can occur.',
          'Arc flash only happens outdoors.',
          'Arc flash can damage which parts of your body?',
          'There is no personal protective equipment that can protect you from arc flash.',
          'Insulated tools can help reduce the risk of arc flash.',
          'Each area with a potential for arc flash needs to have a risk assessment performed.',
          'There is nothing that can be done to reduce the risk of arc flash.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          [
            'Accidental contact',
            'Mishandling of tools',
            'Dust',
            'All of the above',
            'A and B only',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['Ears', 'Eyes', 'Lungs', 'All of the above', 'A and B only'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 3, 0, 1, 3, 1, 0, 0, 1];
        break;

      case 'Compressed Gas Cylinders':
        this.questionList = [
          'If compressed gas cylinders are stored in direct sunlight, the _________ of the gases inside them is likely to rise.',
          'A "pressure relief device" (PRD) is a valve that provides a steady flow of gas from the cylinder through the delivery system to the user.',
          'Because of the extremely low temperatures of cryogenic liquids, the cylinders that contain them require special treatment when they are being handled',
          'Any gas that is leaking from a compressed gas cylinder can push breathable air out of a space, and could cause the people in the space to suffocate.',
          '"Standard compression" is used to squeeze substances such as hydrogen, helium or oxygen into a cylinder in the form of...',
          'Which of the following gases must be dissolved in a solvent in order to be stored safely in a cylinder?',
        ];

        this.choicesList = [
          ['Temperature', 'Toxicity', 'Pressure', 'A and B', 'A and C'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['a liquid', 'a gas', 'a solid'],
          ['Oxygen', 'Propane', 'Acetylene'],
        ];

        this.answersList = [4, 1, 0, 0, 1, 2];
        break;

      case 'Lock Out Tag Out':
        this.questionList = [
          "You don't have to place all controls and switches in the off position before LOTO.",
          "50% of workers who didn't tell other workers they locked out equipment were injured when another employee activated the machinery being worked on.",
          'All energy sources should be isolated before LOTO is performed.',
          'Workers injured on the job from exposure and hazardous energy lose an average days per incident:',
          'Which of the following are considered hazardous energy?',
          'The department of labor estimates the proper use of LOTO procedures prevents:',
          'Once Equipment is ready to be restored and more than one lock is on the tag the supervisor can remove all locks',
          'Steam, air and hydraulic lines should be bled, drained and cleaned out and verified that zero energy state has been achieved.',
          "You don't need to tell other affected workers that machinery is being lock and tagged out.",
          'If there are 3 employees working on machinery how many locks should be placed on the tagout device?',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['7 days', '14 days', '24 days', '48 days'],
          ['Electircal', 'Kinetic', 'Potential', 'Thermal', 'All of the above'],
          [
            '120 deaths and 50,000 injuries each year',
            '150 deaths and 5,000 injuries each year',
            '180 deaths and 50,000 injuries each year',
            '220 deaths and 5,000 injuries each year',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['1', '2', '3', '4'],
        ];

        this.answersList = [1, 0, 0, 2, 4, 0, 1, 0, 1, 2];
        break;

      case 'Take Time for Safety':
        this.questionList = [
          'When you rush through a job, the mistakes caused by rushing often negate any possible time savings.',
          'Which of the following is NOT a risk of moving faster?',
          "If you frequently find yourself running out of time while performing a task, it's probably because you're spending too much time doing the job.",
          'Many workers make poor safety choices even when they are not in a hurry.',
          'While rushing to get all the files scanned and put away in the filing cabinet, Mandy tripped over a cabinet drawer and spilled her coffee.',
          'Which of the following is an example of risky behavior people engage in when trying to:',
          'Being in a hurry is not a legitimate cause of an incident, but rather a symptom of poor planning and poor time management.',
          'In the first incident in the video, Scotty and Robert were rushing to clean up an area of the warehouse before lunch. What was the result of their rushing?',
        ];

        this.choicesList = [
          ['True', 'False'],
          [
            'Less time to scan your path of travel',
            'Less time to react to changing conditions',
            'Less time to be aware of our surroundings',
            'Striking objects with less force',
            'Carrying more momentum',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Changing lanes any time they perceive one lane may be moving faster',
            'Running through yellow lights rather than stopping',
            'Pushing the speed limit',
            'All of the above',
          ],
          ['True', 'False'],
          [
            'In the first incident in the video, Scotty and Robert were rushing to clean up an area of the warehouse before lunch. What was the result of their rushing?',
            'Robert lost focus on safe forklift driving practices and knocked over a cart and pedestrian',
            'Their supervisor commended them for finishing their work so quickly',
          ],
        ];

        this.answersList = [0, 3, 1, 0, 1, 3, 0, 1];
        break;

      // TRUCK DRIVER SECTIONS
      case 'Cell Phones':
        this.questionList = [
          'If you are texting and driving, your reaction time is reduced by approximately _______ percent.',
          'Texting does not cause distractions from driving.',
          'Texting is okay if you are only using one hand.',
          'Texting and driving is more dangerous than talking on the phone while driving.',
          'Texting and driving is a lot safer than drinking and driving.',
          'Texting while driving puts you and others at risk for a possible accident or even death.',
          'You should pull over and stop to receive or respond to a text message.',
          'The choices we make only has an impact on ourselves.',
          'Texting and driving distracts the drive in what way?',
          'Many states in the USA have banned texting and driving.',
        ];

        this.choicesList = [
          ['25', '30', '35', '40'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          [
            'It takes your eyes off the road',
            'You are likely to take your hands off the wheel',
            "It diverts the driver's attention away from the primary task, driving",
            'All of the above',
          ],
          ['True', 'False'],
        ];

        this.answersList = [2, 1, 1, 0, 1, 0, 0, 1, 3, 0];
        break;

      case 'Dump Truck Safety':
        this.questionList = [
          'Pre-Trip Inspections are the key to a well-maintained vehicle.',
          'You should never sit in the cab while receiving a load.',
          'If you notice unusual noises in the motor, you should keep driving until the end of your shift.',
          'You should climb under the raised dump bed at least once a week to clean components.',
          'You should get out of the truck and check for overhead power lines before raising the bed.',
          'Exceeding the maximum gross weight rating of the truck is unsafe.',
          'You should always test the brakes before you start the trucks engine.',
          'A loaded truck takes longer to stop than an empty truck.',
          'Fuel can be a fire hazard and a slip and fall hazard.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 1, 1, 0, 0, 1, 0, 0];
        break;

      // ** OFFICE EMPLOYEES SECTIONS **
      case 'Workplace Violence':
        this.questionList = [
          'Which of the following are considered Tier 1 behavior?',
          'Supervisor’s should avoid direct confrontation about threatening behavior.',
          'The supervisor’s primary role is to gather the facts.',
          'A member of the security department should be present when ___________.',
          'All threats should be investigated immediately.',
          'Night Retail Establishments are in no more danger than any other establishment.',
          'If two employees are having a conflict, the supervisor should speak to each of them individually and in a non-threatening manner.',
          'Your odds of being in an incident of workplace violence are large.',
          'Which of the following are considered to be contributors to workplace violence?',
          'No business is immune from the possibility of workplace violence.',
        ];

        this.choicesList = [
          [
            'Refusal to cooperate',
            'Acting belligerent',
            'Arguing with others',
            'All of the above',
          ],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Interviewing employees',
            'Counseling employees',
            'Terminating employees',
            'All of the above',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          [
            'Prevelance of guns',
            'Layoffs in the workplace',
            'Use of drugs and alcohol in society',
            'All of the above',
          ],
          ['True', 'False'],
        ];

        this.answersList = [3, 1, 0, 3, 0, 1, 0, 1, 3, 0];
        break;

      case 'Emergency Preparedness':
        this.questionList = [
          'The best advice regarding emergencies is _______________.',
          'Understanding your buildings layout and emergency escape routes could save your life.',
          'When must emergency exits must be kept clear?',
          'In the event of a fire, and you are above the first floor, what should you use to exit?',
          'Remaining calm can help you make better decisions in the event of an emergency.',
          'In case of an earthquake, what should you do?',
          'In an active shooter situation, you should make as much noise as possible to startle the shooter.',
          'You can survive an Active Shooter incident.',
          'Hiding may your best way to avoid an Active Shooter.',
          'The odds of a fire or other emergency occurring in your workplace are very small.',
        ];

        this.choicesList = [
          ['Run', 'Be prepared', 'Listen closely', 'None of the above'],
          ['True', 'False'],
          [
            'During business hours',
            'During fire drills',
            'When people are present',
            'At all times',
          ],
          ['Elevators', 'Stairs'],
          ['True', 'False'],
          [
            'Go outside immediately',
            'Stay inside near windows',
            'Take cover under a sturdy desk or doorway',
            'Proceed to your emergency evacuation route',
          ],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [1, 0, 3, 1, 0, 2, 1, 0, 0, 0];
        break;
      case 'Drugs & Alcohol':
        this.questionList = [
          'Many employees suffer and struggle to perform to their full potential due to the effects of substance abuse.',
          'Which of these describe employees with substance abuse issues?',
          'What are the estimated losses for companies in the US due to drug and alcohol related issues?',
          'Approximately, what percentage of drug abusers are employed?',
          'When a person is impaired, it can lead to accidents, inefficiency and reduced productivity.',
          'Job-related stress may encourage some to turn to substances to cope.',
          'Drug and alcohol abuse only affects the person using them.',
          'Signs of drug and alcohol abuse are hard to spot.',
          'The first step in combating drug and alcohol issues is ____________.',
          'Everyone can play a part in reducing the effects of drugs and alcohol in the workplace.',
        ];

        this.choicesList = [
          ['True', 'False'],
          [
            'Less productive',
            'Use more sick days',
            'More likely to get injured',
            'All of the above',
            'A & B only',
          ],
          ['10 Billion', '20 Billion', '50 Billion', '100 Billion'],
          ['10%', '30%', '50%', '70%'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['Disciple', 'Communication', 'Termination', 'Law enforcement'],
          ['True', 'False'],
        ];

        this.answersList = [0, 3, 3, 3, 0, 0, 1, 1, 1, 0];
        break;
      case 'Harassment in the Workplace':
        this.questionList = [
          'If you are uncomfortable with the harasser, it is okay to report the incident to HR.',
          'Harassment can target almost any personal characteristic, and occur between any two people.',
          'Everyone deserves to feel comfortable in his or her work environment.',
          'With social media you can harass people by simply logging into a website and repetitively badgering someone online.',
          'Regardless of the type or nature of the harassment, documenting the event is not recommended.',
          'Harassment must be identified and reported in order for anything to be done.',
          'If you decide to talk to the harasser yourself, make sure you are _______ when talking about the issue.',
          'If your supervisor is the one harassing you, you should report the misconduct to your company’s ___________________ department.',
          'Some employees do not feel comfortable confronting the harasser on their own.',
          'If the behavior continues, then it is time to report the issue to your supervisor.',
        ];

        this.choicesList = [
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['True', 'False'],
          ['Polite', 'Professional', 'Both A & B', 'None of the above'],
          ['Maintenance', 'Mail', 'Human Resource', 'None of the above'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [0, 0, 0, 0, 1, 0, 2, 2, 0, 0];
        break;
      case 'Fire Extinguishers':
        this.questionList = [
          'In which direction should you shoot the extinguisher in?',
          'Point the fire extinguishers hose at the ____ of the fire.',
          'If the fire is small enough for you to put out using an extinguisher, you do not have to pull the fire alarm.',
          'If there is a fire the number one rule to remember is:',
          'When using a fire extinguisher you should stand about _____ feet away from the fire.',
          'In case of a fire, you should always know where the buildings closest exit is.',
          'P.A.S.S. stands for __________.',
          'Extinguishers should be inspected _________.',
          'If you spray the extinguisher standing too close to the fire, you can cause the fire to spread.',
          'Always call the fire department first when there is a fire.',
        ];

        this.choicesList = [
          [
            'Circular direction',
            'Up & down direction',
            'Left to right direction',
            'Any of the above',
          ],
          ['Top', 'Base', 'Middle', 'Cause'],
          ['True', 'False'],
          [
            'Life is more important than property',
            'Grab as much of your property as you can carry in your arms',
            'Pack as many things as you can into a suitcase before exiting the building',
            'None of the above',
          ],
          ['5', '20', '10', '15'],
          ['True', 'False'],
          [
            'Pull, Aim, Stand, Shoot',
            'Pull, Aim, Shoot, Sweep',
            'Pull, Aim, Squeeze, Sweep',
            'Pull, Aim, Stand, Squeeze',
          ],
          ['Daily', 'Weekly', 'Monthly', 'Yearly'],
          ['True', 'False'],
          ['True', 'False'],
        ];

        this.answersList = [2, 1, 1, 0, 2, 0, 2, 2, 0, 0];
        break;
      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [[], [], [], [], [], [], [], [], [], []];

        this.answersList = [];
        break;
      case '':
        this.questionList = ['', '', '', '', '', '', '', '', '', ''];

        this.choicesList = [[], [], [], [], [], [], [], [], [], []];

        this.answersList = [];
        break;

      default:
        alert('Exam Not Found');
        break;
    }
  }
}
