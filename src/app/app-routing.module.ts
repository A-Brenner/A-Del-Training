import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndustriesComponent } from './industries/industries.component';
import { SectionsComponent } from './sections/sections.component';
import { ExamsComponent } from './exams/exams.component';
import { SubmissionComponent } from './submission/submission.component';
import { CongratsComponent } from './congrats/congrats.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'training-programs', component: IndustriesComponent },
  { path: 'training-programs/sections', component: SectionsComponent },
  { path: 'training-programs/sections/exam', component: ExamsComponent },
  {
    path: 'training-programs/sections/submission',
    component: SubmissionComponent,
  },
  {
    path: 'training-programs/sections/submission/congratulations',
    component: CongratsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
