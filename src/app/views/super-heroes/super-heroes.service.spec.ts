import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { SuperHeroe } from '../common/super-heroes.interface';
import { SUPERHEROES } from '../common/test-utils';
import { SuperHeroesService } from './super-heroes.service';

describe('SuperHeroesService', () => {
  let superHeroesService: SuperHeroesService,
    httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000/heroes';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperHeroesService],
    });

    superHeroesService = TestBed.inject(SuperHeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should retrieve all superHeroes', () => {
    superHeroesService.getAllHeros().subscribe((superHeroes) => {
      expect(superHeroes).toBeTruthy();
      expect(superHeroes.length)
        .withContext('Unexpected number of superheroes')
        .toBe(20);
      const hero = superHeroes.find((superHero) => superHero.id == '0');
      expect(hero?.superhero).toBe('Batman');
    });
    const req = httpTestingController.expectOne(apiUrl);
    expect(req.request.method).toEqual('GET');
    req.flush(SUPERHEROES);
  });

  it('should retrieve an array of one hero filtered by ID', () => {
    superHeroesService.getHeroById('1').subscribe((superHero) => {
      expect(superHero).toBeTruthy();
      expect(superHero.length).toBe(1);
      expect(superHero[0]?.superhero).toBe('Superman');
    });
    const req = httpTestingController.expectOne((req) => req.url == apiUrl);
    expect(req.request.params.get('id')).toEqual('1');
    expect(req.request.method).toEqual('GET');
    req.flush([SUPERHEROES[1]]);
  });

  it('should update a hero', () => {
    const hero: Partial<SuperHeroe> = {
      publisher: 'DC',
    };
    const url = `${apiUrl}/${hero.id}`;

    superHeroesService.updateHero(hero).subscribe((res) => {
      expect(res.id).toBe('1');
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('PUT');
    req.flush({
      ...SUPERHEROES[1],
      ...hero,
    });
  });

  it('should delete a hero', () => {
    const id = '1';
    const url = `${apiUrl}/${id}`;

    superHeroesService.deleteHero(id).subscribe((res) => {
      expect(res).toBeTruthy();
    });

    const req = httpTestingController.expectOne(url);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
