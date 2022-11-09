import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { LocationValidator } from '../validators/location.validators';

@Component({
  selector: 'survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  fullDate = new Date()
  today = `${this.fullDate.getFullYear()}-${this.fullDate.getMonth()}-${this.fullDate.getDay()}`
  searchRec = new FormGroup({
    datetime: new FormControl(this.today, Validators.required),
    location: new FormControl('', [
      Validators.required,
      LocationValidator.validOption,
    ]),
  });

  get date() {
    return this.searchRec.get('date');
  }
  get time() {
    return this.searchRec.get('time');
  }
  get location() {
    return this.searchRec.get('location');
  }

  options: string[] = [
    'Google',
    'Microsoft',
    'Apple',
    'Netflix',
    'Amazon',
    'Facebook',
  ];

  filteredOptions!: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.location!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  search(value: any) {
    console.log(value);
  }
}
