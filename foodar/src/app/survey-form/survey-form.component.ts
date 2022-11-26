import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DatasetService } from '../dataset.service';
import data from '../dataset/data.json';
import { restaurant } from '../restaurant';
import { CityValidator } from '../validators/city.validators';
import { StateValidator } from '../validators/state.validators';

@Component({
  selector: 'survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.css'],
})
export class SurveyFormComponent implements OnInit {
  names: string[] = [];
  addresses: string[] = [];
  cities: string[] = [];
  states: string[] = [];
  websites: string[] = [];
  recommend: restaurant[] = [];
  showResults: boolean = false;

  nameList = Object.values(data.name);
  addressList = Object.values(data.address);
  cityList = Object.values(data.cities);
  stateList = Object.values(data.states);
  countryList = Object.values(data.country);
  postalList = Object.values(data.postalCode);
  websiteList = Object.values(data.websites);

  constructor(service: DatasetService) {
    this.names = service.getName();
    this.addresses = service.getAddresses();
    this.cities = service.getCities();
    this.states = service.getStates();
    this.websites = service.getWebsite();
  }

  searchRec = new FormGroup({
    date: new FormControl(''),
    state: new FormControl('', [
      Validators.required,
      StateValidator.validOption,
    ]),
    city: new FormControl('', [Validators.required, CityValidator.validOption]),
  });

  get state() {
    return this.searchRec.get('state');
  }
  get city() {
    return this.searchRec.get('city');
  }

  filteredStates!: Observable<string[]>;
  filteredCities!: Observable<string[]>;

  ngOnInit() {
    this.filteredStates = this.state!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterStates(value || ''))
    );
    this.filteredCities = this.city!.valueChanges.pipe(
      startWith(''),
      map((value) => this._filterCities(value || ''))
    );
  }

  private _filterStates(value: string): string[] {
    const filterState = value.toLowerCase();

    return this.states.filter((c) => c.toLowerCase().includes(filterState));
  }

  // citiesInSate: string[] = [];
  // cityInState(value: string) {
  //   for (let i = 0; i < this.stateList.length; i++) {
  //     if (value == this.stateList[i]) this.citiesInSate.push(this.stateList[i]);
  //   }
  // }

  private _filterCities(value: string): string[] {
    const filterCity = value.toLowerCase();
    return this.cities.filter((c) => c.toLowerCase().includes(filterCity));
  }

  // showCity = false;
  // cityFilter() {
  //   if (this.state?.valid) {
  //     this.city?.enable();
  //     this.showCity = true;
  //   } else {
  //     this.city?.reset();
  //     this.city?.disable();
  //   }
  // }

  find(value: any) {
    this.recommend = [];
    for (let i = 0; i < this.cityList.length; i++) {
      if (value.city == this.cityList[i] && this.recommend.length < 3) {
        let place = {
          name: this.nameList[i],
          address: this.addressList[i],
          city: this.cityList[i],
          state: this.stateList[i],
          country: this.countryList[i],
          postal: this.postalList[i],
          website: this.websiteList[i],
        };

        let names: string[] = [];
        for (let item of this.recommend) {
          names.push(item.name);
        }

        if (!names.includes(place.name)) this.recommend.push(place);
      }
    }
    this.showResults = true;
  }

  choiceColours = ['#fff996', '#afffff', '#ff8c8c'];

  clear() {
    this.showResults = false;
  }
}
