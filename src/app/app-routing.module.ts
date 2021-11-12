import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { IndicatorDetailsComponent } from './pages/indicator-details/indicator-details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'indicator/:codigo', component: IndicatorDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
