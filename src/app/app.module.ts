import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { IndustriesComponent } from './industries/industries.component';
import { SectionsComponent } from './sections/sections.component';
import { ExamsComponent } from './exams/exams.component';
import { SubmissionComponent } from './submission/submission.component';
import { CongratsComponent } from './congrats/congrats.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IndustriesComponent,
    SectionsComponent,
    ExamsComponent,
    SubmissionComponent,
    CongratsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
