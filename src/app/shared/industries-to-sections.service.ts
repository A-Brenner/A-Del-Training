import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndustriesToSectionsService {
  message: string = '';
  constructor() {}
  setMessage(data: string) {
    this.message = data;
    console.log(this.message);
  }
  getMessage() {
    return this.message;
  }
}
