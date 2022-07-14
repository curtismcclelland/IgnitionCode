import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { NgxPaginationModule } from 'ngx-pagination'; 

import { JwtInterceptor, ErrorInterceptor } from './_security';
import { UsersComponent } from './usermanagement/users/users.component';
import { LoginComponent } from './registerlogin/login/login.component';
import { RegisterComponent } from './registerlogin/register/register.component';
import { DiscountsComponent } from './discountmanagement/discounts/discounts.component';
import { DiscountEditComponent } from './discountmanagement/discount-edit/discount-edit.component';
import { RoutenotfoundComponent } from './_security/routenotfound/routenotfound.component';
import { QuoteCreationComponent } from './QuoteCreation/quote-creation.component';
import { QuoteSearchComponent } from './QuoteSearch/quote-search.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  
@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        BrowserAnimationsModule,
        routing
    ],
    declarations: [
        AppComponent,
        LoginComponent,
        UsersComponent,
        RegisterComponent,
        DiscountsComponent,
        DiscountEditComponent,
        RoutenotfoundComponent,
        QuoteCreationComponent,
        QuoteSearchComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
