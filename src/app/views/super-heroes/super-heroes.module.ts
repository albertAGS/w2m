import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperHeroesComponent } from './super-heroes.component';

const routes: Routes = [
  {
    path: '',
    component: SuperHeroesComponent,
  },
];

@NgModule({
  declarations: [SuperHeroesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class SuperHeroesModule {}
