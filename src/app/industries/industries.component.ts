import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-industries',
  templateUrl: './industries.component.html',
  styleUrls: ['./industries.component.scss'],
})
export class IndustriesComponent implements OnInit {
  constructor(private router: Router) {}

  trainingProgram: string = '';
  modalInfo: string =
    'Make sure this is the device you will be using for the entire training experience.\nYour progress will be saved to your current device.';

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

  // Sets up the onClick methods for all images and labels
  // Routes user to the appropriate training section once clicked
  setUpBtns(): void {
    let router: Router = this.router;

    let goToProgram = function (trainingProgram: string): void {
      window.localStorage.setItem('latestProgram', trainingProgram);
      router.navigateByUrl('/training-programs/sections');
    };

    // New Employees Label & Image
    document
      .getElementById('ne-label')
      ?.addEventListener('click', function (): void {
        goToProgram('newEmployees');
      });

    document
      .getElementById('new-employees')
      ?.addEventListener('click', function (): void {
        goToProgram('newEmployees');
      });

    // Field Workers Label & Image
    document
      .getElementById('fw-label')
      ?.addEventListener('click', function (): void {
        goToProgram('fieldWorkers');
      });
    document
      .getElementById('field-workers')
      ?.addEventListener('click', function (): void {
        goToProgram('fieldWorkers');
      });

    // Shop Workers & Mechanics Label & Image
    document
      .getElementById('sw-label')
      ?.addEventListener('click', function (): void {
        goToProgram('shopWorkers');
      });
    document
      .getElementById('shop-workers')
      ?.addEventListener('click', function (): void {
        goToProgram('shopWorkers');
      });

    // Office Employees Label & Image
    document
      .getElementById('oe-label')
      ?.addEventListener('click', function (): void {
        goToProgram('officeEmployees');
      });
    document
      .getElementById('office-employees')
      ?.addEventListener('click', function (): void {
        goToProgram('officeEmployees');
      });

    // Foreman Label & Image
    document
      .getElementById('fm-label')
      ?.addEventListener('click', function (): void {
        goToProgram('foreman');
      });
    document
      .getElementById('foreman')
      ?.addEventListener('click', function (): void {
        goToProgram('foreman');
      });

    // Truck Driver Label & Image
    document
      .getElementById('td-label')
      ?.addEventListener('click', function (): void {
        goToProgram('truckDrivers');
      });
    document
      .getElementById('truck-drivers')
      ?.addEventListener('click', function (): void {
        goToProgram('truckDrivers');
      });
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (!localStorage.getItem('loggedIn')) {
      this.setUpModal();
      localStorage.setItem('loggedIn', 'true');
    }
    this.setUpBtns();
  }
}
