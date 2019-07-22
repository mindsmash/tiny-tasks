import { Observable } from 'rxjs';

import { User } from './user';

export interface UserService {
    getAll(): Observable<User[]>;

    create(name: string, email: string): Observable<User>;
}
