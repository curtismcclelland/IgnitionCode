import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@app/_models';
import { UserService } from '@app/_services';
import {Role} from '@app/_models/role';

@Component({ templateUrl: 'users.component.html' })
export class UsersComponent implements OnInit {
    users: User[] = [];
    p:number;
    userFilter : string = '';

    constructor(
      private userService: UserService
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
        this.userService.getFiltered(this.userFilter).pipe(first()).subscribe(users => {
          this.users = users;
        });
      } 
      else {
        this.userService.getAll().pipe(first()).subscribe(users => {
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
    selectedUser.roles.push(roleStatusSelection as Role);
  };

  updateStatusRoleToServer = (selectedUserName: string, roleStatusSelection: string): void => {
    this.userService.setUserStatusRole(selectedUserName, roleStatusSelection)
      .pipe(first())
      .subscribe(
        data => {
         // this.alertService.success('Registration successful', true);
         // this.router.navigate(['/login']);
        },
        error => {
          // this.alertService.error(error);
        });
  }


  roleStatusChanged = (selectedUser: User, roleStatusSelection: string): void => {
    this.setLocalStatusRole(selectedUser, roleStatusSelection);
    this.updateStatusRoleToServer(selectedUser.userName, roleStatusSelection);
  };



}
