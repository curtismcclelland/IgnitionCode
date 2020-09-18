import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Discount } from '@app/_models/discount';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.component.html',
  styleUrls: ['./discounts.component.css']
})
export class DiscountsComponent implements OnInit {

    apiUrl: string = environment.apiUrl
    inactiveStates: string[]
    discounts: Discount[]
    newStateDiscounts: Discount = new Discount()

    allStates: string[] = [
        'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
        'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD', 'MA',
        'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND',
        'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT',
        'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
    ];

    constructor(private http: HttpClient) { }

    ngOnInit(): void {
        this.resetView()
    }

    resetView() {
        this.newStateDiscounts = new Discount()
        this.getInactiveStates()
        this.getDiscounts()
    }

    // #region API Calls

    getDiscounts() {
        var httpRequest = this.http.get<Discount[]>(`${this.apiUrl}/discounts`)

        httpRequest.subscribe(returnedDiscounts => { this.discounts = returnedDiscounts })
    }

    putDiscount(updatedDiscount: Discount) {
        var httpRequest = this.http.put(`${this.apiUrl}/discounts/${updatedDiscount.state}`, updatedDiscount)

        httpRequest.subscribe(
            success => {
                this.resetView();
            })
    }

    postDiscount(newDiscount: Discount) {
        var httpRequest = this.http.post<number>(`${this.apiUrl}/discounts`, newDiscount)

        httpRequest.subscribe(
            success => {
                this.resetView();
            })
    }

    getInactiveStates() {
        var httpRequest = this.http.get<string[]>(`${this.apiUrl}/discounts/activestates`)

        httpRequest.subscribe(returnedStates => {
            this.inactiveStates = this.allStates.filter(s => !returnedStates.includes(s))
        })
    }

    // #endregion
}
