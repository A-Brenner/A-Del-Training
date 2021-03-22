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

  mySection: sectionModule.Section = new sectionModule.Section(
    1,
    'name',
    false,
    'https:www....'
  );
  sectionsArr: sectionModule.Section[] = [];
  message: string = '';

  // determines which training program was selected
  trainingProgram: string = '';
  latestTrainingProgram: any = '';

  // Determine which sections must be created and calls corresponding function
  createSections(): void {
    switch (this.latestTrainingProgram) {
      case 'newEmployees': {
        this.createSectionsNE();
        console.log(this.sectionsArr);
        break;
      }
      case 'fieldWorkers': {
        this.createSectionsFW();
        console.log(this.sectionsArr);
        break;
      }
      case 'shopWorkers': {
        break;
      }
      case 'officeEmployees': {
        this.createSectionsOE();
        console.log(this.sectionsArr);
        break;
      }
      case 'foreman': {
        this.createSectionsFM();
        this.createSectionsFW();
        console.log(this.sectionsArr);
        break;
      }
      case 'truckDrivers': {
        this.createSectionsTD();
        console.log(this.sectionsArr);
        break;
      }
      default: {
        console.log('Sections NOT FOUND');
      }
    }
  }

  // NEW EMPLOYEES
  // Creates sections for New Employees, Adds sections to array
  createSectionsNE(): void {
    let section1: sectionModule.Section = new sectionModule.Section(
      1,
      'EEO',
      false,
      'https://www....'
    );
    let section2: sectionModule.Section = new sectionModule.Section(
      2,
      'Safety Orientation',
      false,
      'https://www....'
    );
    let section3: sectionModule.Section = new sectionModule.Section(
      3,
      'Sexual Harassment',
      false,
      'https://www....'
    );
    let section4: sectionModule.Section = new sectionModule.Section(
      4,
      'Cell Phone',
      false,
      'https://www....'
    );
    let section5: sectionModule.Section = new sectionModule.Section(
      5,
      'Drug & Alcohol',
      false,
      'https://www....'
    );

    this.sectionsArr.push(section1, section2, section3, section4, section5);
  }

  // OFFICE EMPLOYEES
  // Creates sections for Office Employees, Adds sections to array
  createSectionsOE(): void {
    let section1: sectionModule.Section = new sectionModule.Section(
      1,
      'Emergency Action Plan',
      false,
      'https://www....'
    );
    let section2: sectionModule.Section = new sectionModule.Section(
      2,
      'Active Shooter',
      false,
      'https://www....'
    );
    let section3: sectionModule.Section = new sectionModule.Section(
      3,
      'Sexual Harassment Training',
      false,
      'https://www....'
    );
    let section4: sectionModule.Section = new sectionModule.Section(
      4,
      'First Aid',
      false,
      'https://www....'
    );

    this.sectionsArr.push(section1, section2, section3, section4);
  }

  // FIELD WORKERS
  // Creates sections for Field Workers, Adds sections to array
  createSectionsFW(): void {
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
      'Ladder Safety',
      false,
      'https://www....'
    );
    let section5: sectionModule.Section = new sectionModule.Section(
      5,
      'Fire Prevention',
      false,
      'https://www....'
    );
    let section6: sectionModule.Section = new sectionModule.Section(
      6,
      'First Aid',
      false,
      'https://www....'
    );
    let section7: sectionModule.Section = new sectionModule.Section(
      4,
      'Basic Electrical Safety',
      false,
      'https://www....'
    );
    let section8: sectionModule.Section = new sectionModule.Section(
      8,
      'Slips, Trips, & Falls',
      false,
      'https://www....'
    );
    let section9: sectionModule.Section = new sectionModule.Section(
      9,
      'Trenching & Excavation',
      false,
      'https://www....'
    );
    let section10: sectionModule.Section = new sectionModule.Section(
      10,
      'Fall Protection',
      false,
      'https://www....'
    );
    let section11: sectionModule.Section = new sectionModule.Section(
      11,
      'Confined Space Entry',
      false,
      'https://www....'
    );
    let section12: sectionModule.Section = new sectionModule.Section(
      12,
      'Small Tools',
      false,
      'https://www....'
    );
    let section13: sectionModule.Section = new sectionModule.Section(
      13,
      'Crystalline Silica Safety',
      false,
      'https://www....'
    );
    let section14: sectionModule.Section = new sectionModule.Section(
      14,
      'Machine Guarding',
      false,
      'https://www....'
    );
    let section15: sectionModule.Section = new sectionModule.Section(
      15,
      'Driving Safety',
      false,
      'https://www....'
    );
    let section16: sectionModule.Section = new sectionModule.Section(
      16,
      'Rigging & Load Securement',
      false,
      'https://www....'
    );
    let section17: sectionModule.Section = new sectionModule.Section(
      17,
      'Power Hand Tools',
      false,
      'https://www....'
    );
    let section18: sectionModule.Section = new sectionModule.Section(
      18,
      'Heat Stress',
      false,
      'https://www....'
    );
    let section19: sectionModule.Section = new sectionModule.Section(
      19,
      'Aerial Lifts',
      false,
      'https://www....'
    );
    let section20: sectionModule.Section = new sectionModule.Section(
      20,
      'Working Around Equipment',
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
      section10,
      section11,
      section12,
      section13,
      section14,
      section15,
      section16,
      section17,
      section18,
      section19,
      section20
    );
  }

  // FOREMAN
  // Creates sections for FOREMAN, Adds sections to array
  // Foreman sectiona include all Field Worker sections + more
  createSectionsFM(): void {
    let section1: sectionModule.Section = new sectionModule.Section(
      1,
      'Equipment',
      false,
      'https://www....'
    );
    let section2: sectionModule.Section = new sectionModule.Section(
      2,
      'Accident Investigation',
      false,
      'https://www....'
    );
    let section3: sectionModule.Section = new sectionModule.Section(
      3,
      'Lock Out Tag Out',
      false,
      'https://www....'
    );
    let section4: sectionModule.Section = new sectionModule.Section(
      4,
      'Drug & Alcohol Supervisor',
      false,
      'https://www....'
    );
    let section5: sectionModule.Section = new sectionModule.Section(
      5,
      'Near Miss Reporting',
      false,
      'https://www....'
    );
    let section6: sectionModule.Section = new sectionModule.Section(
      5,
      'HCSS Reporting',
      false,
      'https://www....'
    );

    this.sectionsArr.push(
      section1,
      section2,
      section3,
      section4,
      section5,
      section6
    );
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
    this.message = this.shared.getMessage();

    this.trainingProgram = this.shared.getTrainingProgram();
    this.latestTrainingProgram = window.localStorage.getItem('latestProgram');
    this.createSections();
  }
}
