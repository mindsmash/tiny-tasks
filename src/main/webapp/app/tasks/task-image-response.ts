import { HttpResponse } from '@angular/common/http';
import { Task } from './task';

/**
 * A DTO from ImageResponse
 */
export interface TaskImageResponse {
    image: HttpResponse<Blob>;
    task: Task;
}
