import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { filter, switchMap } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { SuperHeroe } from '../common/super-heroes.interface';
import { HeroDetailsComponent } from '../hero-details/hero-details.component';
import { LoadingService } from '../interceptor/loading.service';
import { SuperHeroesService } from './super-heroes.service';

@Component({
  selector: 'app-super-heroes',
  templateUrl: './super-heroes.component.html',
  styleUrls: ['./super-heroes.component.scss'],
})
export class SuperHeroesComponent implements OnInit, AfterViewInit {
  constructor(
    private superHeroesService: SuperHeroesService,
    private dialog: MatDialog,
    public loadingService: LoadingService
  ) {}
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
    this.getHeroes();
  }

  ngAfterViewInit() {
    this.updatePaginator();
  }

  getHeroes() {
    this.superHeroesService.getAllHeros().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.updatePaginator();
    });
  }

  updatePaginator() {
    if (this.dataSource) this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onEditModifyClick(hero?: SuperHeroe) {
    const dialogRef = this.dialog.open(HeroDetailsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      width: '500px',
      height: 'auto',
      data: hero ?? null,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((it: { hero: SuperHeroe; title: string }) => !!it),
        switchMap((it: { hero: SuperHeroe; title: string }) => {
          if (it.title === 'New Hero') {
            it.hero.id = uuidv4();
            return this.superHeroesService.addHero(it.hero);
          }
          return this.superHeroesService.updateHero(it.hero);
        })
      )
      .subscribe(() => this.getHeroes());
  }
  onDeleteClick(hero: SuperHeroe) {
    this.superHeroesService
      .deleteHero(hero.id)
      .subscribe(() => this.getHeroes());
  }
}
