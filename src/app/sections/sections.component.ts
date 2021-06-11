import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { sectionModule } from './section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  constructor(private router: Router) {}

  // ** GLOBAL VARIABLES **
  // array for holding Section objects
  sectionsArr: sectionModule.Section[] = [];

  // Arrays to hold section data
  titles: string[] = [];
  links: string[] = [];
  linksSpanish: string[] = [];

  // determines which training program was selected
  trainingProgram: string = '';
  latestTrainingProgram: any = '';

  ngOnInit(): void {
    this.latestTrainingProgram = window.localStorage.getItem('latestProgram');
    this.createSections();
  }

  // Sets onClick methods AFTER dynamic HTML is in place
  ngAfterViewInit(): void {
    this.setVideoBtnMethods();
    this.setExamBtnMethods();
    this.setUpModal();
    this.setUpSpanishVideoSwitch();
    this.checkForCompletion();
  }

  // Checks to see if ALL sections have been completed
  // If so, submit button is unlocked
  checkForCompletion(): void {
    for (let i = 0; i < this.sectionsArr.length; i++) {
      if (!this.sectionsArr[i].completed) {
        // a section has NOT been completed
        return;
      }
    }
    // No incomplete sections found, Ready to Submit
    this.setUpSubmitBtn();
  }

  // Makes submit button visible and clickable
  // Sets up onClick method
  setUpSubmitBtn(): void {
    let submitBtn: HTMLButtonElement = document.getElementById(
      'submit-btn'
    ) as HTMLButtonElement;
    submitBtn.style.pointerEvents = 'initial';
    submitBtn.style.opacity = '1.0';
    let router: Router = this.router;

    // Set up email form template and send for submition
    submitBtn.addEventListener('click', function (): void {
      localStorage.setItem(
        localStorage.getItem('latestProgram') + 'Completed',
        'true'
      );
      router.navigateByUrl('/training-programs/sections/submission');
    });
  }

  // Add onClick method for translation input switch
  // Updates each section's link to either english or spanish while also updating videoBtn onClick method
  setUpSpanishVideoSwitch(): void {
    let translationInfo: HTMLElement = document.getElementById(
      'translation-info'
    ) as HTMLElement;
    let videoSwitch: HTMLInputElement = document.getElementById(
      'videoSwitch'
    ) as HTMLInputElement;
    let sections: sectionModule.Section[] = this.sectionsArr;
    let spanishLinks: string[] = this.linksSpanish;
    let englishLinks: string[] = this.links;

    videoSwitch.addEventListener('click', function (): void {
      let isSelected: boolean = videoSwitch.checked;
      if (isSelected) {
        // Update section's links to Spanish videos
        translationInfo.textContent = 'For videos in English, click here';
        for (let i = 0; i < sections.length; i++) {
          sections[i].link = spanishLinks[i];
        }
      } else {
        // Update section's links to English Videos
        translationInfo.textContent = 'Para videos en español haga clic aquí';
        for (let i = 0; i < sections.length; i++) {
          sections[i].link = englishLinks[i];
        }
      }
    });
  }

  // Add onClick methods for each videoBtn on the page
  // directs user to the corresponding video in a new tab / window
  setVideoBtnMethods(): void {
    let sections: sectionModule.Section[] = this.sectionsArr;
    for (let i = 0; i < this.sectionsArr.length; i++) {
      let videoBtn: HTMLButtonElement = document.getElementById(
        'video-btn' + i.toString()
      ) as HTMLButtonElement;
      let examBtn: HTMLButtonElement = document.getElementById(
        'exam-btn' + i.toString()
      ) as HTMLButtonElement;
      videoBtn.addEventListener('click', function (): void {
        // Unlock exam button
        localStorage.setItem(sections[i].sectionName + 'Watched', 'true');
        sections[i].videoWatched = true;
        examBtn.style.opacity = '1.0';
        examBtn.style.pointerEvents = 'initial';

        if (sections[i].link === '') {
          alert('Video Link Not Found.');
        } else {
          // open a new tab (or window depending on user's browser settings)
          // goes directly to the video
          window.open(sections[i].link);
        }
      });
    }
  }

  setExamBtnMethods(): void {
    for (let i = 0; i < this.sectionsArr.length; i++) {
      let examName = this.sectionsArr[i].sectionName;
      let router = this.router;
      document
        .getElementById('exam-btn' + i.toString())
        ?.addEventListener('click', function (): void {
          sessionStorage.setItem('examName', examName);
          router.navigateByUrl('/training-programs/sections/exam');
        });
    }
  }

  setUpModal(): void {
    let modal: HTMLElement = document.querySelector('.modal') as HTMLElement;

    document
      .getElementById('login-info-btn')
      ?.addEventListener('click', function (): void {
        modal.style.display = 'block';
      });

    document
      .querySelector('.close')
      ?.addEventListener('click', function (): void {
        modal.style.display = 'none';
      });

    window.addEventListener('click', function (event): void {
      if (event.target == modal) {
        modal.style.display = 'none';
      }
    });
  }

  createSectionObjects(): void {
    for (let i = 0; i < this.titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(this.titles[i])) {
        completed = true;
      } else {
        completed = false;
      }

      let videoWatched: boolean;
      if (localStorage.getItem(this.titles[i] + 'Watched')) {
        videoWatched = true;
      } else {
        videoWatched = false;
      }

      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        this.titles[i],
        completed,
        this.links[i],
        videoWatched
      );
      this.sectionsArr.push(section);
    }
  }

  createSections(): void {
    switch (this.latestTrainingProgram) {
      case 'newEmployees': {
        this.trainingProgram = 'New Employees';
        this.setSectionDataNE();
        break;
      }
      case 'officeEmployees': {
        this.trainingProgram = 'Office Employees';
        this.setSectionDataOE();
        break;
      }
      case 'fieldWorkers': {
        this.trainingProgram = 'Field Workers';
        this.setSectionDataFW();
        break;
      }
      case 'foreman': {
        // Foreman must complete all Field Worker sections
        // will complete their other training in person
        this.trainingProgram = 'Foreman';
        this.setSectionDataFW();
        break;
      }
      case 'shopWorkers': {
        this.trainingProgram = 'Shop Workers & Mechanics';
        this.setSectionDataSW();
        break;
      }
      case 'truckDrivers': {
        this.trainingProgram = 'Truck Drivers';
        this.setSectionDataTD();
        break;
      }
      default: {
        this.trainingProgram = 'Section Not Found';
        console.log('Sections NOT FOUND');
      }
    }
    this.createSectionObjects();
  }

  // NEW EMPLOYEES
  // Adds section data to arrays
  setSectionDataNE(): void {
    // array of section titles
    this.titles = ['Safety Orientation', 'Cell Phones', 'Drugs & Alcohol'];
    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316e-24-min-2/',
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-1072i-11-min/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052/',
    ];

    // array of SPANISH video links
    this.linksSpanish = [
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316s-24-min-spanish-2/',
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-spanish-ss1072is/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052-spanish/',
    ];
  }

  // OFFICE EMPLOYEES
  // Adds section data to arrays
  setSectionDataOE(): void {
    // array of section titles
    this.titles = ['First Aid'];

    // array of video links
    this.links = ['https://safetysourceonline.com/video/first-aid-m209/'];

    // array of SPANISH video links
    this.linksSpanish = [
      'https://safetysourceonline.com/video/first-aid-m209-spanish/',
    ];
  }

  // FIELD WORKERS
  // Adds section data to arrays
  setSectionDataFW(): void {
    // array of section titles
    this.titles = [
      "PPE: It's Your Call",
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Ladder Safety',
      'Fire Prevention',
      'First Aid',
      'Basic Electrical Safety',
      'Slips, Trips, & Falls',
      'Trenching & Excavation',
      'Fall Protection',
      'Lock Out Tag Out',
      'Confined Space',
      'Crystalline Silica Safety',
      'Machine Guarding',
      'Driver Safety',
      'Rigging & Load Securement',
      'Hand & Power Tool Safety',
      'Heat Stress',
    ];

    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/ppe-its-your-call-1021b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/basic-electrical-safety-1085i-11-min/',
      'https://safetysourceonline.com/video/employee-slips-trips-and-falls-1018d-10-min/',
      'https://safetysourceonline.com/video/13592/',
      'https://safetysourceonline.com/video/fall-protection/',
      'https://safetysourceonline.com/video/lockouttagout-procedures-1036a-14-min/',
      'https://safetysourceonline.com/video/confined-space-entry-ss1055he-10-min/',
      'https://safetysourceonline.com/video/crystalline-silica-safety/',
      'https://safetysourceonline.com/video/machine-guarding-operatorsafety-m4757e/',
      'https://safetysourceonline.com/video/10-4-defensive-driving-ss1087i-11-min/',
      'https://safetysourceonline.com/video/rigging-safety-ss123ae/',
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
    ];

    // array of SPANISH video links
    this.linksSpanish = [
      'https://safetysourceonline.com/video/ppe-its-your-call-spanish-1021bs/',
      'https://safetysourceonline.com/video/ghs-hazardous-materials-labels-ss2001fs-8-min-spanish/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fs-5-min-spanish/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min-spanish/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07-spanish/',
      'https://safetysourceonline.com/video/first-aid-m209-spanish/',
      'https://safetysourceonline.com/video/basic-electrical-safety-ss1085is-11-min-spanish/',
      'https://safetysourceonline.com/video/employee-slips-trips-and-falls-ss1018ds-10-min/',
      'https://safetysourceonline.com/video/trenching-and-shoring-excavation-safety-ssc003e-13-min-spanish/',
      'https://safetysourceonline.com/video/fall-protection-ssc0023as-10-min-spanish/',
      'https://safetysourceonline.com/video/lockouttagout-1036a-14-min-spanish/',
      'https://safetysourceonline.com/video/confined-space-entry-ss1055hs-10-min-spanish/',
      'https://safetysourceonline.com/video/crystalline-silica-safety-spanish/',
      'https://safetysourceonline.com/video/httpssafetysourceonline-commachine-guarding-operator-safety-4757-spanish/',
      'https://safetysourceonline.com/video/10-4-defensive-driving-ss1087is-11-min-spanish/',
      'https://safetysourceonline.com/video/rigging-safety-123-spanish/',
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094is-10-min-spanish/',
      'https://safetysourceonline.com/video/heat-stress-the-facts-1007i-12-min-spanish/',
    ];
  }

  // SHOP WORKERS & MECHANICS
  // Adds section data to arrays
  setSectionDataSW(): void {
    // array of section titles
    this.titles = [
      "PPE: It's Your Call",
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Ladder Safety',
      'Fire Prevention',
      'First Aid',
      'Basic Electrical Safety',
      'Machine Guarding',
      'Hand & Power Tool Safety',
      'Aerial Lift Safety',
      'Forklift Safety',
      'Welding & Cutting',
      'Arc Flash',
      'Compressed Gas Cylinders',
      'Lock Out Tag Out',
      'Take Time for Safety',
      'Heat Stress',
    ];

    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/ppe-its-your-call-1021b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/basic-electrical-safety-1085i-11-min/',
      'https://safetysourceonline.com/video/machine-guarding-operatorsafety-m4757e/',
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/aerial-lift-work-platform-1025g-15-min-2/',
      'https://safetysourceonline.com/video/to-the-point-about-safe-forklift-operation-tp09-11-min/',
      'https://safetysourceonline.com/video/creating-safety-in-welding-operations-4760/',
      'https://safetysourceonline.com/video/arc-flash-updated/',
      'https://safetysourceonline.com/video/compressed-gas-cylinders-m259e/',
      'https://safetysourceonline.com/video/lockouttagout-procedures-1036a-14-min/', // Lock out tag out
      'https://safetysourceonline.com/video/take-time-for-safety-2950-16-min/',
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
    ];

    // array of SPANISH video links
    this.linksSpanish = [
      'https://safetysourceonline.com/video/ppe-its-your-call-spanish-1021bs/',
      'https://safetysourceonline.com/video/ghs-hazardous-materials-labels-ss2001fs-8-min-spanish/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fs-5-min-spanish/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min-spanish/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07-spanish/',
      'https://safetysourceonline.com/video/first-aid-m209-spanish/',
      'https://safetysourceonline.com/video/basic-electrical-safety-ss1085is-11-min-spanish/',
      'https://safetysourceonline.com/video/httpssafetysourceonline-commachine-guarding-operator-safety-4757-spanish/',
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094is-10-min-spanish/',
      'https://safetysourceonline.com/video/aerial-lift-work-platform-1025g-spanish-2/',
      'https://safetysourceonline.com/video/to-the-point-about-safe-forklift-operation-tp09-11-min-spanish/',
      'https://safetysourceonline.com/video/creating-safety-in-welding-operations-4760-spanish/',
      'https://safetysourceonline.com/video/arc-flash-facts-and-prevention-ss1086is-10-min-spanish/',
      'https://safetysourceonline.com/video/compressed-gas-cylinders-m259s/',
      'https://safetysourceonline.com/video/lockouttagout-1036a-14-min-spanish/',
      'https://safetysourceonline.com/video/take-time-for-safety-2950-16-min-spanish/',
      'https://safetysourceonline.com/video/heat-stress-the-facts-1007i-12-min-spanish/',
    ];
  }

  // TRUCK DRIVERS
  // Adds section data to arrays
  setSectionDataTD(): void {
    // array of section titles
    this.titles = [
      "PPE: It's Your Call",
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Fire Prevention',
      'First Aid',
      'Slips, Trips, & Falls',
      'Cell Phones',
      'Dump Truck Safety',
      'Driver Safety',
    ];

    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/ppe-its-your-call-1021b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/employee-slips-trips-and-falls-1018d-10-min/',
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-1072i-11-min/',
      'https://safetysourceonline.com/video/construction-series-dump-truck-safety/',
      'https://safetysourceonline.com/video/10-4-defensive-driving-ss1087i-11-min/',
    ];

    // array of SPANISH video links
    this.linksSpanish = [
      'https://safetysourceonline.com/video/ppe-its-your-call-spanish-1021bs/',
      'https://safetysourceonline.com/video/ghs-hazardous-materials-labels-ss2001fs-8-min-spanish/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fs-5-min-spanish/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07-spanish/',
      'https://safetysourceonline.com/video/first-aid-m209-spanish/',
      'https://safetysourceonline.com/video/employee-slips-trips-and-falls-ss1018ds-10-min/',
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-spanish-ss1072is/',
      'https://safetysourceonline.com/video/dump-truck-safety-ssc020ps-8-mins-spanish/',
      'https://safetysourceonline.com/video/10-4-defensive-driving-ss1087is-11-min-spanish/',
    ];
  }
}
