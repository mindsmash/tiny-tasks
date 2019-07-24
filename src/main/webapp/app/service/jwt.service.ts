import { Injectable } from '@angular/core';
import {AppGlobalValuesService} from "app/service/app-global-values.service";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private globalAppService: AppGlobalValuesService) {

  }

  getToken(): String {
    console.log('jwt key----' + this.globalAppService.getJWTString());
    return this.globalAppService.getJWTString();
  }

  saveToken(token: String) {
    // @ts-ignore
    window.localStorage['jwtToken'] = token;
  }

  destroyToken() {
    // @ts-ignore
    window.localStorage.removeItem('jwtToken');
  }
}
