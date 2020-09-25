import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService, UserCredentials } from '@app/_security';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
    returnUrl: string
    creds: UserCredentials

    constructor(private route: ActivatedRoute, private router: Router, private accountService: AccountService) {
        if (this.accountService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.creds = new UserCredentials
        this.creds.username = "manager@aia.com"
        this.creds.password = "Asdfjkl!1"
        console.log(this.creds)
    }

    ngOnInit() {
        
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    submitForm() {
        console.log(this.creds)
        this.accountService.login(this.creds).subscribe(
                _ => {
                    this.router.navigate([this.returnUrl]);
                });
    }
}
