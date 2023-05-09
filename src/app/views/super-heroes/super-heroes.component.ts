import { Component, OnInit } from '@angular/core';
import { SuperHeroesService } from './super-heroes.service';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.scss'],
})
export class SuperHeroesComponent implements OnInit {
  constructor(private superHeroesService: SuperHeroesService) {}

  ngOnInit() {}

  getHero(id: number) {
    this.superHeroesService.getHeroById(id).subscribe((data: any) => {
      console.log(data);
    });
  }
}
