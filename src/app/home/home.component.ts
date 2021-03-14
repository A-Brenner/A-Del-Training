import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  title: String = 'A-Del Training';
  constructor(private router: Router) {}

  // onClick Method
  // Takes user to the Industries page
  beginTrainingClick(): void {
    this.router.navigateByUrl('/training-programs');
  }

  ngOnInit(): void {}
}
