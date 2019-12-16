import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { WidgetPart } from '@app/_models/widgetPart';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-widget-parts',
    templateUrl: './widget-parts.component.html',
    styleUrls: ['./widget-parts.component.css']
})
export class WidgetPartsComponent implements OnInit {

    private widgetIdSubscription: Subscription;

    widgetID: number;
    parts: WidgetPart[];

    // you need to inject the ActivatedRoute to get access to the passed in parameters
    constructor(private route: ActivatedRoute, private http: HttpClient) { }

    ngOnInit() {

        // set up a subscription to the params observable to grab the 'id' parameter whenever it changes
        this.widgetIdSubscription = this.route.params.subscribe(
                params => {
                    this.widgetID = +params['id'];

                    // after you have the id, use it in an API call.
                    // you don't _have_ to use a service for API calls. you can just use HttpClient directly in your components.
                    this.http.get<WidgetPart[]>(`${environment.apiUrl}/widgetparts/forWidget/${this.widgetID}`)
                        .subscribe(
                            returnedParts => this.parts = returnedParts
                        );
                });
    }

    ngOnDestroy() {
        this.widgetIdSubscription.unsubscribe();
    }

}
