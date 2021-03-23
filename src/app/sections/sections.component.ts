import { Component, OnInit } from '@angular/core';
import { IndustriesToSectionsService } from '../shared/industries-to-sections.service';
import { sectionModule } from './section';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  constructor(private shared: IndustriesToSectionsService) {}

  // array for holding Section objects
  sectionsArr: sectionModule.Section[] = [];

  // determines which training program was selected
  trainingProgram: string = '';
  latestTrainingProgram: any = '';

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
    // array of New Employee section titles
    let titles: string[] = [
      'EEO',
      'Safety Orientation',
      'Sexual Harassment',
      'Cell Phones',
      'Drugs & Alcohol',
    ];
    // array of New Employee video links
    let links: string[] = [
      '', // (Audra) EEO
      'https://safetysourceonline.com/video/safety-bobs-comprehensive-construction-orientation-e1316e-24-min-2/',
      '', // sexual harassment
      'https://safetysourceonline.com/video/cell-phone-hands-free-driving-awareness-ss1089/',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-employees-052/',
    ];

    for (let i = 0; i < titles.length; i++) {
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        false,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // OFFICE EMPLOYEES
  // Creates sections for Office Employees, Adds sections to array
  createSectionsOE(): void {
    // array of New Employee section titles
    let titles: string[] = [
      'Emergency Action Plan',
      'Surviving an Active Shooter',
      'Sexual Harassment',
      'First Aid',
    ];
    // array of New Employee video links
    let links: string[] = [
      '', // (Chuck) Emergency Action Plan
      'https://www.youtube.com/watch?v=DFQ-oxhdFjE',
      '', // sexual harassment
      'https://safetysourceonline.com/video/first-aid-m209/',
    ];

    for (let i = 0; i < titles.length; i++) {
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        false,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // FIELD WORKERS
  // Creates sections for Field Workers, Adds sections to array
  createSectionsFW(startIndex: number): void {
    // array of New Employee section titles
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
    // array of New Employee video links
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
      'https://safetysourceonline.com/video/machine-guarding-conveyor-safety-1003h-12-min/',
      'https://safetysourceonline.com/video/choices-safe-driving-1078ie/',
      '', // rigging & load securement
      'https://safetysourceonline.com/video/hand-power-tool-safety-ss1094ie-10-min/',
      'https://safetysourceonline.com/video/heat-stress-facts-and-prevention/',
      'https://safetysourceonline.com/video/aerial-lift-safety-ss1031be/',
      'https://www.youtube.com/watch?v=7tdfizoornI',
    ];

    for (let i = startIndex; i < titles.length + startIndex; i++) {
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i - startIndex],
        false,
        links[i - startIndex]
      );
      this.sectionsArr.push(section);
    }
  }

  // FOREMAN
  // Creates sections for Foreman, Adds sections to array
  createSectionsFM(): void {
    // array of New Employee section titles
    let titles: string[] = [
      'Equipment',
      'Accident Investigation',
      'Lock Out Tag Out',
      'Drug & Alcohol Supervisor',
      'HCSS Reporting',
    ];
    // array of New Employee video links
    let links: string[] = [
      '', // Equipment
      'https://safetysourceonline.com/video/accident-investigation-for-everyone-2485-2/',
      '',
      'https://safetysourceonline.com/video/dealing-with-drug-and-alcohol-abuse-for-managers-and-supervisors-053/',
      'https://safetysourceonline.com/video/evaluating-near-misses-to-prevent-accidents-bbcs1008-8-min/', // Near miss reporting
      '', // HCSS
    ];

    for (let i = 0; i < titles.length; i++) {
      let section: sectionModule.Section = new sectionModule.Section(
        i + 1,
        titles[i],
        false,
        links[i]
      );
      this.sectionsArr.push(section);
    }
  }

  // TRUCK DRIVERS
  // Creates sections for Truck Drivers, Adds sections to array
  createSectionsTD(): void {
    let section1: sectionModule.Section = new sectionModule.Section(
      1,
      'PPE: Basic Training',
      false,
      'https://www....'
    );
    let section2: sectionModule.Section = new sectionModule.Section(
      2,
      'Hazardous Materials Labels',
      false,
      'https://www....'
    );
    let section3: sectionModule.Section = new sectionModule.Section(
      3,
      'GHS: Safety Data Sheets',
      false,
      'https://www....'
    );
    let section4: sectionModule.Section = new sectionModule.Section(
      4,
      'Fire Prevention',
      false,
      'https://www....'
    );
    let section5: sectionModule.Section = new sectionModule.Section(
      5,
      'First Aid',
      false,
      'https://www....'
    );
    let section6: sectionModule.Section = new sectionModule.Section(
      6,
      'Slips, Trips, & Falls',
      false,
      'https://www....'
    );
    let section7: sectionModule.Section = new sectionModule.Section(
      7,
      'Cell Phones',
      false,
      'https://www....'
    );
    let section8: sectionModule.Section = new sectionModule.Section(
      8,
      'Drugs & Alcohol',
      false,
      'https://www....'
    );
    let section9: sectionModule.Section = new sectionModule.Section(
      9,
      'Dump Truck Safety',
      false,
      'https://www....'
    );
    let section10: sectionModule.Section = new sectionModule.Section(
      10,
      'Driver Safety',
      false,
      'https://www....'
    );

    this.sectionsArr.push(
      section1,
      section2,
      section3,
      section4,
      section5,
      section6,
      section7,
      section8,
      section9,
      section10
    );
  }

  ngOnInit(): void {
    this.latestTrainingProgram = window.localStorage.getItem('latestProgram');
    this.createSections();
  }
}
