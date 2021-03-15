import { Component, OnInit } from '@angular/core';
import { IndustriesToSectionsService } from '../shared/industries-to-sections.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.scss'],
})
export class SectionsComponent implements OnInit {
  constructor(private shared: IndustriesToSectionsService) {}

  message: string = '';

  // determines which training program was selected
  trainingProgram: string = '';

  // NEW EMPLOYEE SECTIONS
  neSection1 = {
    sectionName: 'EEO',
    sectionNo: 1,
    completed: false,
    link: '',
  };
  neSection2 = {
    sectionName: 'Safety Orientation',
    sectionNo: 2,
    completed: false,
    link: '',
  };
  neSection3 = {
    sectionName: 'Sexual Harassment',
    sectionNo: 3,
    completed: false,
    link: '',
  };
  neSection4 = {
    sectionName: 'Cell Phone',
    sectionNo: 4,
    completed: false,
    link: '',
  };
  neSection5 = {
    sectionName: 'Drug & Alcohol',
    sectionNo: 5,
    completed: false,
    link: '',
  };

  // OFFICE EMPLOYEE SECTIONS
  oeSection1 = {
    sectionName: 'Emergency Action Plan',
    sectionNo: 1,
    completed: false,
    link: '',
  };
  oeSection2 = {
    sectionName: 'Active Shooter',
    sectionNo: 2,
    completed: false,
    link: '',
  };
  oeSection3 = {
    sectionName: 'Sexual Harassment',
    sectionNo: 3,
    completed: false,
    link: '',
  };
  oeSection4 = {
    sectionName: 'First Aid',
    sectionNo: 4,
    completed: false,
    link: '',
  };

  // ** ARRAYS OF SECTIONS **
  newEmployeeSections = [
    this.neSection1,
    this.neSection2,
    this.neSection3,
    this.neSection4,
    this.neSection5,
  ];
  officeEmployeeSections = [
    this.oeSection1,
    this.oeSection2,
    this.oeSection3,
    this.oeSection4,
  ];

  // //
  // newEmployeeProgram = {
  //   programName: 'New Employees',
  //   completed: false,
  //   sections: this.newEmployeeSections,
  // };

  ngOnInit(): void {
    this.message = this.shared.getMessage();
    this.trainingProgram = this.shared.getTrainingProgram();
  }
}
