import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Discount } from '@app/_models/discount';
import { Router } from '@angular/router';

@Component({
  templateUrl: './discounts.component.html'
})
export class DiscountsComponent implements OnInit {

    apiUrl: string = environment.apiUrl
    discounts: Discount[]
    inactiveStates: string[]

    constructor(private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.getInactiveStates()
        this.getDiscounts()
    }

    stateChanged(state: string) {
        this.router.navigate(['discount','add',state])
    }

    // #region API Calls

    getDiscounts() {
        var httpRequest = this.http.get<Discount[]>(`${this.apiUrl}/discounts`)

        httpRequest.subscribe(returnedDiscounts => {
            this.discounts = returnedDiscounts
        })
    }

    getInactiveStates() {
        var httpRequest = this.http.get<string[]>(`${this.apiUrl}/discounts/inactivestates`)

        httpRequest.subscribe(returnedStates => {
            this.inactiveStates = returnedStates
        })
    }

    // #endregion
}