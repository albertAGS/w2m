import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { UppercaseDirective } from '../hero-details/uppercase.directive';
import { SuperHeroesComponent } from './super-heroes.component';

const routes: Routes = [
  {
    path: '',
    component: SuperHeroesComponent,
  },
];

@NgModule({
  declarations: [
    SuperHeroesComponent,
    HeroDetailsComponent,
    UppercaseDirective,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatToolbarModule,
    MatProgressBarModule,
  ],
})
export class SuperHeroesModule {}
