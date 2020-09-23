import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent }  from './app.component';
import { routing }        from './app.routing';

import { AlertComponent } from './_components';
import { NgxPaginationModule } from 'ngx-pagination'; 

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { UsersComponent } from './users';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { WidgetsComponent } from './widgets/widgets.component';
import { WidgetPartsComponent } from './widget-parts/widget-parts.component';
import { DiscountsComponent } from './discounts/discounts.component';
import { DiscountEditComponent } from './discount-edit/discount-edit.component';

@NgModule({
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        NgxPaginationModule,
        routing
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        LoginComponent,
        UsersComponent,
        RegisterComponent,
        WidgetsComponent,
        WidgetPartsComponent,
        DiscountsComponent,
        DiscountEditComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
