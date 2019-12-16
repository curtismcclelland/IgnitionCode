import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';
import { User, UserCredentials, UserRegistration } from '@app/_models';

@Injectable({ providedIn: 'root' })
export class AccountService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    register(user: UserRegistration) {
        return this.http.post(`${environment.apiUrl}/account/register`, user);
    }

    login(credentials: UserCredentials) {
        // make a strongly typed request to the API
        // this will perform some processing on the result and then return an Observable <User> to the caller
        return this.http.post<User>(`${environment.apiUrl}/account/authenticate`, credentials)
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));

                    // update the user object
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');

        // update the user object
        this.currentUserSubject.next(null);
    }
}
