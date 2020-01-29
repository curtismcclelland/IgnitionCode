var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { first } from 'rxjs/operators';
import { UserService } from '@app/_services';
let UsersComponent = class UsersComponent {
    constructor(userService) {
        this.userService = userService;
        this.users = [];
        this.userFilter = '';
        this.userFilterChanged = (roleStatusSelection) => {
            this.userFilter = roleStatusSelection;
            this.populateUserList();
        };
        this.populateUserList = () => {
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
        this.getRoleStatus = (selectedUser) => {
            if (!selectedUser.isActive)
                return 'Inactive';
            if (selectedUser.roles && selectedUser.roles.length > 0)
                return selectedUser.roles[0];
            return 'Active';
        };
        this.setLocalStatusRole = (selectedUser, roleStatusSelection) => {
            selectedUser.roles.length = 0;
            if (roleStatusSelection === 'Inactive') {
                selectedUser.isActive = false;
                return;
            }
            selectedUser.isActive = true;
            selectedUser.roles.push(roleStatusSelection);
        };
        this.updateStatusRoleToServer = (selectedUserName, roleStatusSelection) => {
            this.userService.setUserStatusRole(selectedUserName, roleStatusSelection)
                .pipe(first())
                .subscribe(data => {
                // this.alertService.success('Registration successful', true);
                // this.router.navigate(['/login']);
            }, error => {
                // this.alertService.error(error);
            });
        };
        this.roleStatusChanged = (selectedUser, roleStatusSelection) => {
            this.setLocalStatusRole(selectedUser, roleStatusSelection);
            this.updateStatusRoleToServer(selectedUser.userName, roleStatusSelection);
        };
    }
    ngOnInit() {
    }
};
UsersComponent = __decorate([
    Component({ templateUrl: 'users.component.html' }),
    __metadata("design:paramtypes", [UserService])
], UsersComponent);
export { UsersComponent };
//# sourceMappingURL=users.component.js.map