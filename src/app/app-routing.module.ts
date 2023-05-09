import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'allHeroes',
    pathMatch: 'full',
  },
  {
    path: 'allHeroes',
    loadChildren: () =>
      import('./views/super-heroes/super-heroes.module').then(
        (module) => module.SuperHeroesModule
      ),
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
