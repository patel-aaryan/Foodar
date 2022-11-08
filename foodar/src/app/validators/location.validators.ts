import { AbstractControl, ValidationErrors } from '@angular/forms';

export class LocationValidator {
  static validOption(control: AbstractControl): ValidationErrors | null {
    const options: string[] = [
      'Google',
      'Microsoft',
      'Apple',
      'Netflix',
      'Amazon',
      'Facebook',
    ];

    const code = control.value as string;

    if (options.includes(code) || code == '') return null;

    return { validOption: true };
  }
}
