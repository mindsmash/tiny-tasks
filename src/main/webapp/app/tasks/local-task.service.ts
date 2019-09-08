import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {v4 as uuid} from 'uuid';

import {Task} from './task';
import {TaskService} from './task.service';

@Injectable()
export class LocalTaskService implements TaskService {

    private static readonly STORAGE_KEY: string = 'tiny.tasks';

    getAll(): Observable<Task[]> {
        let tasks = this.readTasks().sort((a, b) => {
            if (a.done !== b.done) {
                return a.done ? 1 : -1;
            }
        });
        return of(tasks);
    }

    create(name: string): Observable<Task> {
        const tasks = this.readTasks();
        const task = {id: uuid(), name, done: false};
        tasks.push(task);
        this.writeTasks(tasks);
        return of(task);
    }

    delete(id: string): Observable<void> {
        const tasks = this.readTasks();
        const index = tasks.findIndex(task => task.id === id);
        if (index !== -1) {
            tasks.splice(index, 1);
            this.writeTasks(tasks);
        }
        return of(null);
    }

    deleteCompletedTasks(): Observable<void> {
        let tasks = this.readTasks();
        // @ts-ignore
        let tasks1 = tasks.filter(value => value.done === false);
        this.writeTasks(tasks1);
        return of(null);
    }

    done(id: string): Observable<Task> {
        const tasks = this.readTasks();
        let task = null;
        tasks.map(value => {
            if (value.id === id) {
                value.done = true;
                task = value;
            }
        });
        this.writeTasks(tasks);
        return of(task);
    }

    private readTasks(): Task[] {
        const tasks = localStorage.getItem(LocalTaskService.STORAGE_KEY);
        return tasks ? JSON.parse(tasks) : [];
    }

    private writeTasks(tasks: Task[]): void {
        localStorage.setItem(LocalTaskService.STORAGE_KEY, JSON.stringify(tasks));
    }
}
