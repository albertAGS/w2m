import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SuperHeroe } from '../common/super-heroes.interface';

@Injectable({
  providedIn: 'root',
})
export class SuperHeroesService {
  private apiUrl = 'http://localhost:3000/heroes';

  constructor(private http: HttpClient) {}

  //  All super heroes
  getAllHeros() {
    return this.http.get<SuperHeroe[]>(this.apiUrl);
  }
  // Get by id
  getHeroById(id: string) {
    const params = new HttpParams().set('id', id);
    return this.http.get<SuperHeroe[]>(this.apiUrl, { params });
  }
  // Consultar todos los súper héroes que contienen, en su nombre, el valor
  // de un parámetro enviado en la petición. Por ejemplo, si enviamos
  // “man” devolverá “Spiderman”, “Superman”, “Manolito el fuerte”, etc.
  getHerosByName(name: string) {
    const params = new HttpParams().set('superhero_like', name.toString());
    return this.http.get<SuperHeroe[]>(this.apiUrl, { params });
  }

  // Modificar un súper héroe.
  updateHero(hero: Partial<SuperHeroe>) {
    const url = `${this.apiUrl}/${hero.id}`;
    return this.http.put<SuperHeroe>(url, hero);
  }

  // add a hero.
  addHero(hero: SuperHeroe) {
    return this.http.post<SuperHeroe>(this.apiUrl, hero);
  }

  // Eliminar un súper héroe.
  deleteHero(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
