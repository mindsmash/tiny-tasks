import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AppGlobalValuesService {


  userData: {
    firstName,
    surName,
    token,
    roleName
  };
  isLoggedIn = false;

  ROLE_SUPER_ADMIN = 'ROLE_SUPER_ADMIN';
  ROLE_STUDENT = 'ROLE_STUDENT';
  ROLE_DATA_ENTRY_PERSON = 'ROLE_DATA_ENTRY_PERSON';
  ROLE_TUTOR = 'ROLE_TUTOR';
  ROLE_PARENT = 'ROLE_PARENT';

  /*
   * setLocalUserProfile function is used to set local user profile data.
   */
  public setLocalUserProfile(value) {
    sessionStorage.setItem('userProfile', JSON.stringify(value));
    this.getLocalStorageUser();
    this.isLoggedIn = true;
  }

  constructor(private toastr: ToastrService, private router: Router) {
  }

  public getGeneralErrorString(): string {
    return 'Server Error Occured,Retry Later!.';
  }

  public getJWTString() {
    const userProfString = sessionStorage.getItem('userProfile');
    if (userProfString) {
      const userProf = JSON.parse(userProfString);
      return userProf.token;
    }
    return null;
  }

  public getUserProfileObject() {
    this.userData = JSON.parse(sessionStorage.getItem('userProfile'));
    return this.userData;
  }

  /**
   * turn string into pascal case.
   * @param str
   */
  public pascalize(str) {
    return str.replace(/(\w)(\w*)/g,
      function (g0, g1, g2) {
        return g1.toUpperCase() + g2.toLowerCase();
      });
  }

  /*
   *  getLocalStorageUser function is used to get local user profile data.
   */
  public getLocalStorageUser() {
    this.userData = JSON.parse(sessionStorage.getItem('userProfile'));
    if (this.userData) {
      this.isLoggedIn = true;
      return true;
    } else {
      this.isLoggedIn = false;
      return false;
    }
  }

  public getUserRoleNameMap(): Map<string, string> {
    const userRoleNameMap = new Map<string, string>();
    userRoleNameMap.set(this.ROLE_SUPER_ADMIN, 'Super Administrator');
    userRoleNameMap.set(this.ROLE_STUDENT, 'Student');
    userRoleNameMap.set(this.ROLE_DATA_ENTRY_PERSON, 'Data Entry Admin');
    userRoleNameMap.set(this.ROLE_TUTOR, 'Tutor');
    userRoleNameMap.set(this.ROLE_PARENT, 'Parent');

    return userRoleNameMap;
  }

  public getUserRoleName(): string {
    return this.getUserProfileObject().roleName;
  }

  /**
   * get user friendly name of role ,eg ROLE_TUTOR will be formatted to 'TUTOR'
   * @param userRoleName
   */
  public getUserFriendlyRoleName(userRoleName): string {
    return this.getUserRoleNameMap().get(userRoleName);
  }

  public logOut() {
    sessionStorage.removeItem('userProfile');
    this.isLoggedIn = false;
    this.toastr.success('Successfully logged out!');
    this.router.navigate(['']);
  }


}
