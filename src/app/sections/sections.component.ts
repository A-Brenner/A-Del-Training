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

  // determines which training program was selected
  trainingProgram: string = '';
  latestTrainingProgram: any = '';
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

  // Determine which sections must be created and calls corresponding function
  createSections(): void {
    switch (this.latestTrainingProgram) {
      case 'newEmployees': {
        this.trainingProgram = 'New Employees';
        this.createSectionsNE();
        console.log(this.sectionsArr);
        break;
      }
      case 'fieldWorkers': {
        this.trainingProgram = 'Field Workers';
        this.createSectionsFW(0);
        console.log(this.sectionsArr);
        break;
      }
      case 'shopWorkers': {
        this.trainingProgram = 'Shop Workers & Mechanics';
        this.createSectionsSW();
        console.log(this.sectionsArr);
        break;
      }
      case 'officeEmployees': {
        this.trainingProgram = 'Office Employees';
        this.createSectionsOE();
        console.log(this.sectionsArr);
        break;
      }
      case 'foreman': {
        // Foreman must complete both Foreman AND Field Worker sections
        this.trainingProgram = 'Foreman';
        this.createSectionsFM();
        console.log(this.sectionsArr);
        this.createSectionsFW(this.sectionsArr.length);
        console.log(this.sectionsArr);
        break;
      }
      case 'truckDrivers': {
        this.trainingProgram = 'Truck Drivers';
        this.createSectionsTD();
        console.log(this.sectionsArr);
        break;
      }
      default: {
        this.trainingProgram = 'Section Not Found';
        console.log('Sections NOT FOUND');
      }
    }
  }

  // NEW EMPLOYEES
  // Creates sections for New Employees, Adds sections to array
  createSectionsNE(): void {
    // array of section titles
    let titles: string[] = [
      'EEO',
      'Safety Orientation',
      'Sexual Harassment',
      'Cell Phones',
      'Drugs & Alcohol',
    ];
    // array of video links
    let links: string[] = [
      '', // (Audra) EEO
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316e-24-min-2/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/cell-phone-hands-free-driving-awareness-ss1089/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052/',
    ];

    for (let i = 0; i < titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        completed,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // OFFICE EMPLOYEES
  // Creates sections for Office Employees, Adds sections to array
  createSectionsOE(): void {
    // array of section titles
    let titles: string[] = [
      'Emergency Action Plan',
      'Surviving an Active Shooter',
      'Sexual Harassment',
      'First Aid',
    ];
    // array of video links
    let links: string[] = [
      '', // (Chuck) Emergency Action Plan
      'https://www.youtube.com/watch?v=DFQ-oxhdFjE',
      '', // sexual harassment
      'https://safetysourceonline.com/video/first-aid-m209/',
    ];

    for (let i = 0; i < titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        completed,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // FIELD WORKERS
  // Creates sections for Field Workers, Adds sections to array
  createSectionsFW(startIndex: number): void {
    // array of section titles
    let titles: string[] = [
      'PPE: Basic Training',
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
    let links: string[] = [
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

    for (let i = startIndex; i < titles.length + startIndex; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i - startIndex],
        completed,
        links[i - startIndex]
      );
      this.sectionsArr.push(section);
    }
  }

  // FOREMAN
  // Creates sections for Foreman, Adds sections to array
  createSectionsFM(): void {
    // array of section titles
    let titles: string[] = [
      'Equipment',
      'Accident Investigation',
      'Lock Out Tag Out',
      'Drug & Alcohol - Supervisors',
      'Near Miss Reporting',
      'HCSS Reporting',
    ];
    // array of video links
    let links: string[] = [
      '', // Equipment
      'https://safetysourceonline.com/video/accident-investigation-for-everyone-2485-2/',
      '',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-managers-and-supervisors-053/',
      'https://safetysourceonline.com/video/evaluating-near-misses-to-prevent-accidents-bbcs1008-8-min/', // Near miss reporting
      '', // HCSS
    ];

    for (let i = 0; i < titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        completed,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // SHOP WORKERS & MECHANICS
  // Creates sections for Shop Workers, Adds sections to array
  createSectionsSW(): void {
    // array of section titles
    let titles: string[] = [
      'PPE: Basic Training',
      'Hazardous Materials Labels',
      'GHS: Safety Data Sheets',
      'Ladder Safety',
      'Sexual Harassment',
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
      'Making Safety Work',
      'Heat Stress',
      'Slips, Trips, & Falls',
    ];
    // array of video links
    let links: string[] = [
      'https://safetysourceonline.com/video/ppebasic-training-1028b-12-min/',
      'https://safetysourceonline.com/video/ghs-labels-ss2001fe/',
      'https://safetysourceonline.com/video/ghs-safety-data-sheets-the-basics-ss2002fe/',
      'https://safetysourceonline.com/video/ladder-safety-8019a-10-min/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/to-the-point-about-fire-prevention-response-tp07/',
      'https://safetysourceonline.com/video/first-aid-m209/',
      'https://safetysourceonline.com/video/basic-electrical-safety-1085i-11-min/',
      'https://safetysourceonline.com/video/grinding-and-abrasive-wheels-ss040789/',
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/aerial-lift-safety-ss1031be/',
      'https://safetysourceonline.com/video/to-the-point-about-safe-forklift-operation-tp09-11-min/',
      'https://safetysourceonline.com/video/creating-safety-in-welding-operations-4760/',
      'https://safetysourceonline.com/video/arc-flash-updated/',
      'https://safetysourceonline.com/video/compressed-gas-cylinders-m259e/',
      '', // Lock out tag out
      '', // Making safety work
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
      'https://safetysourceonline.com/video/slips-trips-falls-ss1064ie-5-concise-version/',
    ];

    for (let i = 0; i < titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        completed,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // TRUCK DRIVERS
  // Creates sections for TRUCK DRIVERS, Adds sections to array
  createSectionsTD(): void {
    // array of section titles
    let titles: string[] = [
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
    let links: string[] = [
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

    for (let i = 0; i < titles.length; i++) {
      let completed: boolean;
      if (localStorage.getItem(titles[i])) {
        completed = true;
        console.log(titles[i] + ' completed');
      } else {
        console.log(titles[i] + ' NAWWW');
        completed = false;
      }
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        completed,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }
}
