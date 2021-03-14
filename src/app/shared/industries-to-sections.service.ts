import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndustriesToSectionsService {
  message: string = '';
  trainingProgram: string = '';

  constructor() {}
  setMessage(data: string): void {
    this.message = data;
  }

  setTrainingProgram(program: string): void {
    this.trainingProgram = program;
  }

  getTrainingProgram(): string {
    return this.trainingProgram;
  }

  getMessage(): string {
    return this.message;
  }
}
