import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor() {}

  trainingProgram: string = '';

  // OnCLick methods for images and labels
  newEmployeesClicked(): void {
    console.log('new employees');
    this.trainingProgram = 'newEmployees';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  fieldWorkersClicked(): void {
    console.log('field workers');
    this.trainingProgram = 'fieldWorkers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  shopWorkersClicked(): void {
    console.log('shop workers & mechanics');
    this.trainingProgram = 'shopWorkers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  officeEmployeesClicked(): void {
    console.log('office employees');
    this.trainingProgram = 'officeEmployees';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  foremanClicked(): void {
    console.log('foreman');
    this.trainingProgram = 'foreman';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  truckDriversClicked(): void {
    console.log('truck drivers');
    this.trainingProgram = 'truckDrivers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  ngOnInit(): void {}
}
