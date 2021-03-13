import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor() {}

  // OnCLick methods for images and labels
  newEmployeesClicked() {
    console.log('new employees');
  }

  fieldWorkersClicked() {
    console.log('field workers');
  }

  shopWorkersClicked() {
    console.log('shop workers & mechanics');
  }

  officeEmployeesClicked() {
    console.log('office employees');
  }

  foremanClicked() {
    console.log('foreman');
  }

  truckDriversClicked() {
    console.log('truck drivers');
  }
  ngOnInit(): void {}
}
