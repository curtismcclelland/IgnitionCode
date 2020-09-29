import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { environment } from '@environments/environment';
import {User, Roles} from '@app/_security';
import { HttpClient } from '@angular/common/http';

@Component({ templateUrl: 'users.component.html' })
export class UsersComponent implements OnInit {
    users: User[] = [];
    p:number;
    userFilter : string = '';

    constructor(
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        
    }

    userFilterChanged = (roleStatusSelection: string): void => {
      this.userFilter = roleStatusSelection;
      this.populateUserList();
    };

    populateUserList = (): void => {
      if (this.userFilter) {
        this.getFiltered(this.userFilter).pipe(first()).subscribe(users => {
          this.users = users;
        });
      } 
      else {
        this.getAll().pipe(first()).subscribe(users => {
          this.users = users;
        });
      }
    };

  getRoleStatus = (selectedUser: User) : string => {
    if (!selectedUser.isActive) return 'Inactive';
    if (selectedUser.roles && selectedUser.roles.length > 0) return selectedUser.roles[0];
    return 'Active';
  };

  setLocalStatusRole = (selectedUser: User, roleStatusSelection: string): void => {
    selectedUser.roles.length = 0;
    if (roleStatusSelection === 'Inactive') {
      selectedUser.isActive = false;
      return;
    }
    selectedUser.isActive = true;
    selectedUser.roles.push(roleStatusSelection as Roles);
  };

  updateStatusRoleToServer = (selectedUserName: string, roleStatusSelection: string): void => {
    this.setUserStatusRole(selectedUserName, roleStatusSelection)
      .pipe(first())
      .subscribe();
  }


  roleStatusChanged = (selectedUser: User, roleStatusSelection: string): void => {
    this.setLocalStatusRole(selectedUser, roleStatusSelection);
    this.updateStatusRoleToServer(selectedUser.userName, roleStatusSelection);
  };


    // #region API Calls

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    getFiltered(userStatusRole: string) {
        return this.http.get<User[]>(`${environment.apiUrl}/users/getFilteredUsers?userStatusRole=${userStatusRole}`);
    }


    setUserStatusRole(selectedUserName: string, roleStatusSelection: string) {
        const body = {
            userName: selectedUserName,
            statusRole: roleStatusSelection
        };
        return this.http.post(`${environment.apiUrl}/users/setUserStatusRole`, body);
    }


    // #endregion

}
