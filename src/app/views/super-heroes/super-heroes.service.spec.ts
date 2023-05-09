import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
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
});
