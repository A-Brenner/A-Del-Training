import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IndustriesToSectionsService } from '../shared/industries-to-sections.service';
import { sectionModule } from './section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  constructor(
    private shared: IndustriesToSectionsService,
    private router: Router
  ) {}

  // array for holding Section objects
  sectionsArr: sectionModule.Section[] = [];

  // Arrays to hold section data
  titles: string[] = [];
  links: string[] = [];
  linksSpanish: string[] = [];

  // determines which training program was selected
  trainingProgram: string = '';
  latestTrainingProgram: any = '';

  // Displayed within modal
  loginInfo: string = 'Username: cfairer@a-del.com\nPassword: AdelSafety#1';

  ngOnInit(): void {
    this.latestTrainingProgram = window.localStorage.getItem('latestProgram');
    this.createSections();
  }

  // Sets onClick methods AFTER dynamic HTML is in place
  ngAfterViewInit(): void {
    this.setVideoBtnMethods();
    this.setExamBtnMethods();
    this.setUpModal();
  }

  // Add onClick methods for each videoBtn on the page
  // directs user to the corresponding video in a new tab / window
  setVideoBtnMethods(): void {
    for (let i = 0; i < this.sectionsArr.length; i++) {
      let videoLink = this.sectionsArr[i].link;

      document
        .getElementById('videoBtn' + i.toString())
        ?.addEventListener('click', function (): void {
          if (videoLink === '') {
            alert('Video Link Not Found.');
          } else {
            // open a new tab (or window depending on user's browser settings)
            // goes directly to the video
            window.open(videoLink);
          }
        });
    }
  }

  setExamBtnMethods(): void {
    for (let i = 0; i < this.sectionsArr.length; i++) {
      let examName = this.sectionsArr[i].sectionName;
      let router = this.router;
      document
        .getElementById('examBtn' + i.toString())
        ?.addEventListener('click', function (): void {
          console.log('examBtn clicked :)');
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
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        this.titles[i],
        completed,
        this.links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  createSections(): void {
    switch (this.latestTrainingProgram) {
      case 'newEmployees': {
        this.trainingProgram = 'New Employees';
        this.setSectionDataNE();
        console.log(this.sectionsArr);
        break;
      }
      case 'fieldWorkers': {
        this.trainingProgram = 'Field Workers';
        this.setSectionDataFW();
        console.log(this.sectionsArr);
        break;
      }
      case 'shopWorkers': {
        this.trainingProgram = 'Shop Workers & Mechanics';
        this.setSectionDataSW();
        console.log(this.sectionsArr);
        break;
      }
      case 'officeEmployees': {
        this.trainingProgram = 'Office Employees';
        this.setSectionDataOE();
        console.log(this.sectionsArr);
        break;
      }
      case 'foreman': {
        this.trainingProgram = 'Foreman';
        this.setSectionDataFM();
        console.log(this.sectionsArr);
        break;
      }
      case 'truckDrivers': {
        this.trainingProgram = 'Truck Drivers';
        this.setSectionDataTD();
        console.log(this.sectionsArr);
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
  // Creates sections for New Employees, Adds sections to array
  setSectionDataNE(): void {
    // array of section titles
    this.titles = [
      'EEO',
      'Safety Orientation',
      'Sexual Harassment',
      'Cell Phones',
      'Drugs & Alcohol',
    ];
    // array of video links
    this.links = [
      '', // EEO (Chuck Recorded Video)
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316e-24-min-2/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-1072i-11-min/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052/',
    ];

    this.linksSpanish = [
      '', // EEO
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316s-24-min-spanish-2/',
      '', // Sexual Harassment
      'https://safetysourceonline.com/video/texting-and-driving-the-facts-spanish-ss1072is/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052-spanish/',
    ];
  }

  // OFFICE EMPLOYEES
  // Creates sections for Office Employees, Adds sections to array
  setSectionDataOE(): void {
    // array of section titles
    this.titles = [
      'Emergency Action Plan',
      'Surviving an Active Shooter',
      'Sexual Harassment',
      'First Aid',
    ];
    // array of video links
    this.links = [
      '', // (Chuck) Emergency Action Plan
      'https://www.youtube.com/watch?v=DFQ-oxhdFjE',
      '', // sexual harassment
      'https://safetysourceonline.com/video/first-aid-m209/',
    ];

    this.linksSpanish = [
      '', // (Chuck) Emergency Action Plan
      'https://www.youtube.com/watch?v=DFQ-oxhdFjE',
      '', // Sexual Harassment
      'https://safetysourceonline.com/video/first-aid-m209-spanish/',
    ];
  }

  // FIELD WORKERS
  // Creates sections for Field Workers, Adds sections to array
  setSectionDataFW(): void {
    // array of section titles
    this.titles = [
      "PPE: It's Your Call",
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Ladder Safety',
      'Sexual Harassment',
      'Fire Prevention',
      'First Aid',
      'Basic Electrical Safety',
      'Slips, Trips, & Falls',
      'Trenching & Excavation',
      'Fall Protection',
      'Confined Space',
      'Small Tools',
      'Crystalline Silica Safety',
      'Machine Guarding',
      'Driving Safety',
      'Rigging & Load Securement',
      'Hand & Power Tool Safety',
      'Heat Stress',
      'Aerial Lift Safety',
      'Working Around Equipment',
    ];
    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/ppe-its-your-call-1021b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/basic-electrical-safety-1085i-11-min/',
      'https://safetysourceonline.com/video/slips-trips-falls-ss1064ie-5-concise-version/',
      'https://safetysourceonline.com/video/13592/',
      'https://safetysourceonline.com/video/fall-protection/',
      'https://safetysourceonline.com/video/confined-space-entry-ss1055he-10-min/',
      '', // small tools
      'https://safetysourceonline.com/video/crystalline-silica-safety/',
      'https://safetysourceonline.com/video/grinding-and-abrasive-wheels-ss040789/',
      'https://safetysourceonline.com/video/choices-safe-driving-1078ie/',
      '', // rigging & load securement
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
      'https://safetysourceonline.com/video/aerial-lift-safety-ss1031be/',
      'https://www.youtube.com/watch?v=7tdfizoornI',
    ];
  }

  // FOREMAN
  // Creates sections for Foreman, Adds sections to array
  setSectionDataFM(): void {
    // array of section titles
    this.titles = [
      'Equipment',
      'Accident Investigation',
      'Lock Out Tag Out',
      'Drug & Alcohol - Supervisors',
      'Near Miss Reporting',
      'HCSS Reporting',
      "PPE: It's Your Call",
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Ladder Safety',
      'Sexual Harassment',
      'Fire Prevention',
      'First Aid',
      'Basic Electrical Safety',
      'Slips, Trips, & Falls',
      'Trenching & Excavation',
      'Fall Protection',
      'Confined Space',
      'Small Tools',
      'Crystalline Silica Safety',
      'Machine Guarding',
      'Driving Safety',
      'Rigging & Load Securement',
      'Hand & Power Tool Safety',
      'Heat Stress',
      'Aerial Lift Safety',
      'Working Around Equipment',
    ];
    // array of video links
    this.links = [
      '', // Equipment
      'https://safetysourceonline.com/video/accident-investigation-for-everyone-2485-2/',
      '',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-managers-and-supervisors-053/',
      'https://safetysourceonline.com/video/evaluating-near-misses-to-prevent-accidents-bbcs1008-8-min/', // Near miss reporting
      '', // HCSS
      'https://safetysourceonline.com/video/ppebasic-training-1028b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/basic-electrical-safety-1085i-11-min/',
      'https://safetysourceonline.com/video/slips-trips-falls-ss1064ie-5-concise-version/',
      'https://safetysourceonline.com/video/13592/',
      'https://safetysourceonline.com/video/fall-protection/',
      'https://safetysourceonline.com/video/confined-space-entry-ss1055he-10-min/',
      '', // small tools
      'https://safetysourceonline.com/video/crystalline-silica-safety/',
      'https://safetysourceonline.com/video/grinding-and-abrasive-wheels-ss040789/',
      'https://safetysourceonline.com/video/choices-safe-driving-1078ie/',
      '', // rigging & load securement
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
      'https://safetysourceonline.com/video/aerial-lift-safety-ss1031be/',
      'https://www.youtube.com/watch?v=7tdfizoornI',
    ];
  }

  // SHOP WORKERS & MECHANICS
  // Creates sections for Shop Workers, Adds sections to array
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
      'Hand & Power Tools',
      'Aerial Lift Safety',
      'Forklift Safety',
      'Welding & Cutting',
      'Arc Flash',
      'Compressed Gas Cylinders',
      'Lock Out Tag Out',
      'Take Time for Safety',
      'Heat Stress',
      'Sexual Harassment',
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
      '', // sexual harassment
    ];

    this.linksSpanish = [
      'https://safetysourceonline.com/video/ppe-its-your-call-spanish-1021bs/',
      'https://safetysourceonline.com/video/ghs-hazardous-materials-labels-ss2001fs-8-min-spanish/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fs-5-min-spanish/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min-spanish/',
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07-spanish/',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
      '',
    ];
  }

  // TRUCK DRIVERS
  // Creates sections for TRUCK DRIVERS, Adds sections to array
  setSectionDataTD(): void {
    // array of section titles
    this.titles = [
      'PPE: Basic Training',
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Sexual Harassment',
      'Fire Prevention',
      'First Aid',
      'Slips, Trips, & Falls',
      'Cell Phones',
      'Drugs & Alcohol',
      'Dump Truck Safety',
      'Driver Safety',
    ];
    // array of video links
    this.links = [
      'https://safetysourceonline.com/video/ppebasic-training-1028b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/emergency-first-aid-1058i-19-min-2/', // First Aid ... 2  video options
      'https://safetysourceonline.com/video/slips-trips-falls-ss1064ie-5-concise-version/',
      'https://safetysourceonline.com/video/cell-phone-hands-free-driving-awareness-ss1089/',
      'https://safetysourceonline.com/video/dot-drugs-alcohol-what-employees-need-to-know-ss17041ae/',
      'https://safetysourceonline.com/video/construction-series-dump-truck-safety/',
      'https://safetysourceonline.com/video/choices-safe-driving-1078ie/',
    ];
  }
}
