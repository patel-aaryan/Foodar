import { AbstractControl, ValidationErrors } from '@angular/forms';
import data from '../dataset/data.json';

export class StateValidator {
  static validOption(control: AbstractControl): ValidationErrors | null {
    const states: string[] = Object.values(data.states);

    const code = control.value as string;

    if (states.includes(code) || code == '') return null;

    return { validOption: true };
  }
}
