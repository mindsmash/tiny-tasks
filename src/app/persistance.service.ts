import { Injectable } from '@angular/core';
@Injectable()
export class PersistanceService {
  constructor() {}

  /**
   * Sets the given k/v to the locale storage
   * @param key
   * @param value
   */
  set(key: string, value: any): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('error saving to storage', e);
    }
  }

  /**
   * Get the Item with the given Key
   * @param key
   */
  get(key: string) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (e) {
      console.error('error getting data from storage', e);
      return null;
    }
  }
}
