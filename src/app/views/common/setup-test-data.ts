import { SuperHeroes } from '../super-heroes/super-heroes.interface';
import { SUPERHEROES } from './test-utils';

export function setupCourses(): SuperHeroes[] {
  return Object.values(SUPERHEROES) as SuperHeroes[];
}
