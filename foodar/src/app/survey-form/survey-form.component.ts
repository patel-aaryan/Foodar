import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  storeName = new FormControl('', [Validators.required]);
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
    this.filteredOptions = this.storeName!.valueChanges.pipe(
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
  searchStore(value: any) {
    console.log(value);
  }
}
