import { Observable } from 'rxjs';

import { Task } from 'app/_shared/_entities/task';
import {Jobs} from "app/_shared/_entities/jobs";
import {JobsRequest} from "app/_shared/_dto/jobs-request";

/**
 * Service interface for implementations that handle tiny tasks.
 */
export interface JobsService {

  getJobByUser(): Observable<Jobs>;

  update(job: JobsRequest): Observable<void>;

}
