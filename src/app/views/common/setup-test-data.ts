import { SuperHeroe } from './super-heroes.interface';
import { SUPERHEROES } from './test-utils';

export function setupCourses(): SuperHeroe[] {
  return Object.values(SUPERHEROES) as SuperHeroe[];
}
