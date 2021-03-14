import { Component, OnInit } from '@angular/core';
import { IndustriesToSectionsService } from '../shared/industries-to-sections.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor(private shared: IndustriesToSectionsService) {}

  message: string = 'Helloo World :)';
  trainingProgram: string = '';

  // OnCLick methods for images and labels
  newEmployeesClicked(): void {
    console.log('new employees');
    this.trainingProgram = 'newEmployees';
    this.shared.setTrainingProgram(this.trainingProgram);
  }

  fieldWorkersClicked(): void {
    console.log('field workers');
    this.trainingProgram = 'fieldWorkers';
    this.shared.setTrainingProgram(this.trainingProgram);
  }

  shopWorkersClicked(): void {
    console.log('shop workers & mechanics');
    this.trainingProgram = 'shopWorkers';
    this.shared.setTrainingProgram(this.trainingProgram);
  }

  officeEmployeesClicked(): void {
    console.log('office employees');
    this.trainingProgram = 'officeEmployees';
    this.shared.setTrainingProgram(this.trainingProgram);
  }

  foremanClicked(): void {
    console.log('foreman');
    this.trainingProgram = 'foreman';
    this.shared.setTrainingProgram(this.trainingProgram);
  }

  truckDriversClicked(): void {
    console.log('truck drivers');
    this.trainingProgram = 'truckDrivers';
    this.shared.setTrainingProgram(this.trainingProgram);
  }
  ngOnInit(): void {}
}
