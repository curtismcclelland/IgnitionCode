import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Discount } from '@app/_models/discount';
import { Router } from '@angular/router';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

    apiUrl: string = environment.apiUrl
    discounts: Discount[]
    inactiveStates: string[]

    allStates: string[] = [
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
        'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
        'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

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

        httpRequest.subscribe(returnedDiscounts => { this.discounts = returnedDiscounts })
    }

    getInactiveStates() {
        var httpRequest = this.http.get<string[]>(`${this.apiUrl}/discounts/activestates`)

        httpRequest.subscribe(returnedStates => {
            this.inactiveStates = this.allStates.filter(s => !returnedStates.includes(s))
        })
    }

    // #endregion
}
