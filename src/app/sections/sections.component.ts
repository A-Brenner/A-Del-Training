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
  ngOnInit(): void {
    this.message = this.shared.getMessage();
  }
}
