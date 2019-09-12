import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { throwError, BehaviorSubject, Observable } from "rxjs";
import { PersistanceService } from "../shared/persistance.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  public currentUser: Observable<any>;
  public id: any;
  private host: string = "http://localhost:8080/authentication";

  constructor(
    private persister: PersistanceService,
    private httpClient: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<any>(
      persister.get("currentUser")
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.httpClient
      .post<any>(this.host + "?action=login", {
        username: username,
        pwd: password
      })
      .pipe(
        catchError(this.handleError),
        map(user => {
          if (user) {
            // store user details in local storage to keep user logged in between page refreshes
            this.persister.set("currentUser", user);
            this.currentUserSubject.next(user);
          }
          return user;
        })
      );
  }

  logout() {
    return this.httpClient.post<any>(this.host + "?action=logout", {}).pipe(
      map(response => {
        // remove user from local storage to log user out
        this.persister.clear();
        this.currentUserSubject.next(null);
        return response;
      })
    );
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = "An unknown error occured!";
    if (!errorResponse.error) {
      return throwError(errorMessage);
    }
    switch (errorResponse.error.message) {
      case "Access Denied":
        errorMessage = "The username or the password is not correct";
        break;
    }
    return throwError(errorMessage);
  }
}
