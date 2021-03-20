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
        break;
      }
      case 'shopWorkers': {
        break;
      }
      case 'officeEmployees': {
        console.log(this.sectionsArr);
        break;
      }
      case 'foreman': {
        break;
      }
      case 'truckDrivers': {
        break;
      }
    }
  }

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
