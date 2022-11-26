import { Injectable } from '@angular/core';
import data from './dataset/data.json';

@Injectable({
  providedIn: 'root',
})
export class DatasetService {
  getName() {
    return Object.values(data.name);
  }

  getAddresses() {
    return Object.values(data.address);
  }

  getCities(): string[] {
    let list: string[] = Object.values(data.cities);
    let filtered: string[] = [];

    for (let item of list) {
      if (!filtered.includes(item)) filtered.push(item);
    }
    return filtered;
  }

  getStates(): string[] {
    let list: string[] = Object.values(data.states);
    let filtered: string[] = [];

    for (let item of list) {
      if (!filtered.includes(item)) filtered.push(item);
    }
    return filtered;
  }

  getWebsite() {
    return Object.values(data.websites);
  }
}
