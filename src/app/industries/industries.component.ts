import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor() {}

  trainingProgram: string = '';
  modalInfo: string =
    'Make sure this is the device you will be using for the entire training experience.\nYour progress will be saved to your current device.';

  // OnCLick methods for images and labels
  newEmployeesClicked(): void {
    this.trainingProgram = 'newEmployees';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  fieldWorkersClicked(): void {
    this.trainingProgram = 'fieldWorkers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  shopWorkersClicked(): void {
    this.trainingProgram = 'shopWorkers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  officeEmployeesClicked(): void {
    this.trainingProgram = 'officeEmployees';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  foremanClicked(): void {
    this.trainingProgram = 'foreman';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  truckDriversClicked(): void {
    this.trainingProgram = 'truckDrivers';
    window.localStorage.setItem('latestProgram', this.trainingProgram);
  }

  setUpModal(): void {
    let modal: HTMLElement = document.querySelector('.modal') as HTMLElement;
    modal.style.display = 'block';

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

  // TODO set up event listeners for training programs
  // Remove html click functions
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!localStorage.getItem('loggedIn')) {
      this.setUpModal();
      localStorage.setItem('loggedIn', 'true');
    }
  }
}
