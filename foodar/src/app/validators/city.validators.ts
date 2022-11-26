import { AbstractControl, ValidationErrors } from '@angular/forms';
import data from '../dataset/data.json';

export class CityValidator {
  static validOption(control: AbstractControl): ValidationErrors | null {
    const cities: string[] = Object.values(data.cities);

    const code = control.value as string;

    if (cities.includes(code) || code == '') return null;

    return { validOption: true };
  }
}
