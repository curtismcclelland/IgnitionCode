import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/_security';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  getFiltered(userStatusRole : string) {
    return this.http.get<User[]>(`${environment.apiUrl}/users/getFilteredUsers?userStatusRole=${userStatusRole}`);
  }


  setUserStatusRole(selectedUserName: string, roleStatusSelection: string) {
    const body = {
      userName: selectedUserName, 
      statusRole: roleStatusSelection
    };
    return this.http.post(`${environment.apiUrl}/users/setUserStatusRole`,body);
  }
}
