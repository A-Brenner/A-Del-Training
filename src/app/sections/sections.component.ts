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

  // // ARRAYS OF SECTIONS
  // newEmployeeSections: object[] = [];

  // // NEW EMPLOYEE SECTIONS
  // neSection1: object = {};
  // neSection2: object = {};
  // neSection3: object = {};
  // neSection4: object = {};
  // neSection5: object = {};
  // // OFFICE EMPLOYEE SECTIONS
  // oeSection1: object = {};
  // oeSection2: object = {};
  // oeSection3: object = {};
  // oeSection4: object = {};
  // // TRUCK DRIVER SECTIONS
  // tdSection1: object = {};
  // tdSection2: object = {};
  // tdSection3: object = {};
  // tdSection4: object = {};
  // tdSection5: object = {};
  // tdSection6: object = {};
  // tdSection7: object = {};
  // tdSection8: object = {};
  // tdSection9: object = {};
  // tdSection10: object = {};

  // // OFFICE EMPLOYEE SECTIONS
  // oeSection1 = {
  //   sectionName: 'Emergency Action Plan',
  //   sectionNo: 1,
  //   completed: false,
  //   link: '',
  // };
  // oeSection2 = {
  //   sectionName: 'Active Shooter',
  //   sectionNo: 2,
  //   completed: false,
  //   link: '',
  // };
  // oeSection3 = {
  //   sectionName: 'Sexual Harassment',
  //   sectionNo: 3,
  //   completed: false,
  //   link: '',
  // };
  // oeSection4 = {
  //   sectionName: 'First Aid',
  //   sectionNo: 4,
  //   completed: false,
  //   link: '',
  // };

  // // TRUCK DRIVER SECTIONS
  // tdSection1 = {
  //   sectionName: 'PPE: Basic Training',
  //   sectionNo: 1,
  //   completed: false,
  //   link: '',
  // };
  // tdSection2 = {
  //   sectionName: 'Hazardous Materials Labels',
  //   sectionNo: 2,
  //   completed: false,
  //   link: '',
  // };
  // tdSection3 = {
  //   sectionName: 'GHS: Safety Data Sheets',
  //   sectionNo: 3,
  //   completed: false,
  //   link: '',
  // };
  // tdSection4 = {
  //   sectionName: 'Fire Prevention',
  //   sectionNo: 4,
  //   completed: false,
  //   link: '',
  // };
  // tdSection5 = {
  //   sectionName: 'First aid',
  //   sectionNo: 5,
  //   completed: false,
  //   link: '',
  // };
  // tdSection6 = {
  //   sectionName: 'Slips, Trips, & Falls',
  //   sectionNo: 6,
  //   completed: false,
  //   link: '',
  // };
  // tdSection7 = {
  //   sectionName: 'Cell Phones',
  //   sectionNo: 7,
  //   completed: false,
  //   link: '',
  // };
  // tdSection8 = {
  //   sectionName: 'Drugs & Alcohol',
  //   sectionNo: 8,
  //   completed: false,
  //   link: '',
  // };
  // tdSection9 = {
  //   sectionName: 'Dump Truck Safety',
  //   sectionNo: 9,
  //   completed: false,
  //   link: '',
  // };
  // tdSection10 = {
  //   sectionName: 'Driver Safety',
  //   sectionNo: 10,
  //   completed: false,
  //   link: '',
  // };

  // // ** ARRAYS OF SECTIONS **
  // newEmployeeSections = [
  //   this.neSection1,
  //   this.neSection2,
  //   this.neSection3,
  //   this.neSection4,
  //   this.neSection5,
  // ];
  // officeEmployeeSections = [
  //   this.oeSection1,
  //   this.oeSection2,
  //   this.oeSection3,
  //   this.oeSection4,
  // ];
  // truckDriverSections = [
  //   this.tdSection1,
  //   this.tdSection2,
  //   this.tdSection3,
  //   this.tdSection4,
  //   this.tdSection5,
  //   this.tdSection6,
  //   this.tdSection7,
  //   this.tdSection8,
  //   this.tdSection9,
  //   this.tdSection10,
  // ];

  createSections(): void {
    switch (this.latestTrainingProgram) {
      case 'newEmployees': {
        this.createSectionsNE();
        console.log(this.sectionsArr);
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

  ngOnInit(): void {
    this.message = this.shared.getMessage();

    this.trainingProgram = this.shared.getTrainingProgram();
    this.latestTrainingProgram = window.localStorage.getItem('latestProgram');
    this.createSections();
  }
}
