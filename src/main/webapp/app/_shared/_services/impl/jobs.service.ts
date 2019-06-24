import {HttpClient} from '@angular/common/http';
import {Inject, Injectable} from '@angular/core';

import {BASE_URL} from 'app/app.tokens';
import {Observable} from "rxjs";
import {JobsService} from "app/_shared/_services/jobs.service";
import {Jobs} from "app/_shared/_entities/jobs";
import {JobsRequest} from "app/_shared/_dto/jobs-request";

@Injectable()
export class JobsServiceImpl implements JobsService {

  constructor(private http: HttpClient, @Inject(BASE_URL) private baseUrl: string) {
  }

  getJobByUser(): Observable<Jobs> {
    const token = localStorage.getItem('token');
    return this.http.get<Jobs>(this.baseUrl + '/jobs/user?token=' + token);
  }

  update(job: JobsRequest): Observable<void> {
    return this.http.put<void>(this.baseUrl + '/jobs', job);
  }
}
