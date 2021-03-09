import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { IndustriesComponent } from './industries/industries.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'industries', component: IndustriesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
