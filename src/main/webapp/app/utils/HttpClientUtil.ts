import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BASE_URL } from '../app.tokens';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientUtil {
  jwtToken = '';

  constructor(
    private userService: UserService,
    private http: HttpClient,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    this.userService.userAuth$.subscribe((user) => {
      this.jwtToken = user.jwtToken;
    });
  }

  private getAuthHeader = () => ({
    headers: {
      Authorization: 'Bearer ' + this.jwtToken,
    },
  });

  authClient(config = {}) {
    return {
      get: <T>(url: string) =>
        this.http.get<T>(this.baseUrl + url, {
          ...config,
          ...this.getAuthHeader(),
        }),
      post: <T>(url: string, body: any) =>
        this.http.post<T>(this.baseUrl + url, body, {
          ...config,
          ...this.getAuthHeader(),
        }),
      delete: <T>(url: string) =>
        this.http.delete<T>(this.baseUrl + url, {
          ...config,
          ...this.getAuthHeader(),
        }),
    };
  }
}
