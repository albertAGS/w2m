import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SuperHeroe } from './super-heroes.interface';
import { SuperHeroesService } from './super-heroes.service';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.scss'],
})
export class SuperHeroesComponent implements OnInit, AfterViewInit {
  constructor(private superHeroesService: SuperHeroesService) {}
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'name',
    'publisher',
    'alter_ego',
    'first_appearance',
    'buttons',
  ];
  dataSource: MatTableDataSource<SuperHeroe>;
  nameFiltered = '';

  ngOnInit() {
    this.superHeroesService.getAllHeros().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.updatePaginator();
    });
  }

  ngAfterViewInit() {
    this.updatePaginator();
  }

  updatePaginator() {
    if (this.dataSource) this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAddClick() {
    console.log('add');
  }
  onEditClick(hero: SuperHeroe) {
    console.log(hero);
  }
  onDeleteClick(hero: SuperHeroe) {}

  // getHero(id: number) {
  //   this.superHeroesService.getHeroById(id).subscribe((data: any) => {
  //     console.log(data);
  //   });
  // }
}
