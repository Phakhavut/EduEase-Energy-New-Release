
import { House } from './types';
import { PERSONA_CONFIGS, getHousesForPersona } from './data/personaThemes';

// Default to student residential spaces for student persona
export const HOUSES: House[] = PERSONA_CONFIGS.student.houses;

export { getHousesForPersona };
