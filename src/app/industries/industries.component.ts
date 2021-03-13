import { Component, OnInit } from '@angular/core';
import { IndustriesToSectionsService } from '../shared/industries-to-sections.service';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor(private shared: IndustriesToSectionsService) {}

  message = 'Helloo World :)';

  // OnCLick methods for images and labels
  newEmployeesClicked() {
    console.log('new employees');
    this.message = 'new Employees ^_^';
    this.shared.setMessage(this.message);
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
