import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  save(key: string, value: string, mode: string = 'local') {
    switch (mode) {
      case 'local' :
        localStorage.setItem(key, value);
        break;
      case 'session' :
        sessionStorage.setItem(key, value);
        break;
    }
  }

  remove(key: string, mode: string = 'local') {
    switch (mode) {
      case 'local' :
        localStorage.removeItem(key);
        break;
      case 'session' :
        sessionStorage.removeItem(key);
        break;
    }
  }

  get(key: string, mode: string = 'local'): string {
    switch (mode) {
      case 'local' :
        return localStorage.getItem(key);
      case 'session' :
        return sessionStorage.getItem(key);
    }
  }

  exists(key: string, mode: string = 'local'): boolean {
    switch (mode) {
      case 'local' :
        return localStorage.getItem(key) !== null;
      case 'session' :
        return sessionStorage.getItem(key) !== null;
    }
  }
}
