import { Component, OnInit } from '@angular/core';
import { Discount } from '../_models/discount';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-discount-edit',
    templateUrl: './discount-edit.component.html',
    styleUrls: ['./discount-edit.component.css']
})
export class DiscountEditComponent implements OnInit {

    apiUrl: string = environment.apiUrl
    stateParamSubscription: Subscription

    discount: Discount
    action: string

    constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

    ngOnInit(): void {
        this.stateParamSubscription = this.route.params.subscribe(
            params => {
                this.action = params['action']

                switch (this.action) {
                    case "add":
                        this.initializeDiscount(params['state'])
                        break
                    case "edit":
                        this.getDiscount(params['state'])
                        break
                }
            }
        )
    }

    ngOnDestroy() {
        this.stateParamSubscription.unsubscribe();
    }

    submitForm() {
        switch (this.action) {
            case "add":
                this.postDiscount(this.discount)
                break
            case "edit":
                this.putDiscount(this.discount)
                break
        }
    }

    initializeDiscount(state: string) {
        this.discount = new Discount
        this.discount.state = state
    }

    // #region API Calls

    getDiscount(state: string) {
        var httpRequest = this.http.get<Discount>(`${this.apiUrl}/discounts/${state}`)

        httpRequest.subscribe(
            returnedDiscount => {
                this.discount = returnedDiscount
            })
    }

    putDiscount(updatedDiscount: Discount) {
        var httpRequest = this.http.put(`${this.apiUrl}/discounts/${updatedDiscount.state}`, updatedDiscount)

        httpRequest.subscribe(
            success => {
                this.router.navigateByUrl("/discounts")
            })
    }

    postDiscount(newDiscount: Discount) {
        var httpRequest = this.http.post<number>(`${this.apiUrl}/discounts`, newDiscount)

        httpRequest.subscribe(
            success => {
                this.router.navigateByUrl("/discounts")
            })
    }

    // #endregion
}
