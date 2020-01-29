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
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService, AccountService } from '@app/_services';
import { UserCredentials } from '@app/_models';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, route, router, accountService, alertService) {
        this.formBuilder = formBuilder;
        this.route = route;
        this.router = router;
        this.accountService = accountService;
        this.alertService = alertService;
        this.loading = false;
        this.submitted = false;
        // redirect to home if already logged in
        if (this.accountService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }
    ngOnInit() {
        // initialize the form model
        this.loginForm = this.formBuilder.group({
            username: ['manager@aia.com', Validators.required],
            password: ['Asdfjkl!1', Validators.required]
        });
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }
    onSubmit() {
        // controls won't validate until first submission attempt
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        // allows UI to indicate a data operation is progress
        this.loading = true;
        // create a credential object to be passed to the API
        var credentials = new UserCredentials();
        credentials.username = this.f.username.value;
        credentials.password = this.f.password.value;
        // call the account service and process the result
        this.accountService.login(credentials)
            .pipe(first())
            .subscribe(user => {
            // we don't do anything with the returned user object
            // just navigate to the originally requested URL
            this.router.navigate([this.returnUrl]);
        }, error => {
            // show the error message in the UI
            this.alertService.error(error);
            // allows the UI to update based on the end of the data operation
            this.loading = false;
        });
    }
};
LoginComponent = __decorate([
    Component({ templateUrl: 'login.component.html' }),
    __metadata("design:paramtypes", [FormBuilder,
        ActivatedRoute,
        Router,
        AccountService,
        AlertService])
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map