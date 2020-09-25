import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccountService, UserRegistration } from '@app/_security';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {

    registration: UserRegistration = new UserRegistration()

    constructor(private router: Router, private accountService: AccountService) { 

    }

    ngOnInit() {
    }

    onSubmit() {
        this.accountService.register(this.registration)
            .pipe(first())
            .subscribe(
                _ => {
                    this.router.navigate(['/login']);
                });
    }
}
