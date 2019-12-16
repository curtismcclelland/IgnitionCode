import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AccountService } from '@app/_services';
import { UserCredentials } from '@app/_models';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) {
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
            .subscribe(
                user => {
                    // we don't do anything with the returned user object
                    // just navigate to the originally requested URL
                    this.router.navigate([this.returnUrl]);
                },
            error => {
                    // show the error message in the UI
                    this.alertService.error(error);

                    // allows the UI to update based on the end of the data operation
                    this.loading = false;
                });
    }
}
