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
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
let WidgetPartsComponent = class WidgetPartsComponent {
    // you need to inject the ActivatedRoute to get access to the passed in parameters
    constructor(route, http) {
        this.route = route;
        this.http = http;
    }
    ngOnInit() {
        // set up a subscription to the params observable to grab the 'id' parameter whenever it changes
        this.widgetIdSubscription = this.route.params.subscribe(params => {
            this.widgetID = +params['id'];
            // after you have the id, use it in an API call.
            // you don't _have_ to use a service for API calls. you can just use HttpClient directly in your components.
            this.http.get(`${environment.apiUrl}/widgetparts/forWidget/${this.widgetID}`)
                .subscribe(returnedParts => this.parts = returnedParts);
        });
    }
    ngOnDestroy() {
        this.widgetIdSubscription.unsubscribe();
    }
};
WidgetPartsComponent = __decorate([
    Component({
        selector: 'app-widget-parts',
        templateUrl: './widget-parts.component.html',
        styleUrls: ['./widget-parts.component.css']
    }),
    __metadata("design:paramtypes", [ActivatedRoute, HttpClient])
], WidgetPartsComponent);
export { WidgetPartsComponent };
//# sourceMappingURL=widget-parts.component.js.map