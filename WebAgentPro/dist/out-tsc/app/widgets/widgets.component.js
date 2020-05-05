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
import { WidgetsService } from '@app/_services/widgets.service';
import { Widget } from '@app/_models/widget';
import { AlertService } from '@app/_services';
import { first } from 'rxjs/operators';
let WidgetsComponent = class WidgetsComponent {
    // Inject the WidgetService and AlertService instances
    constructor(service, alertService) {
        this.service = service;
        this.alertService = alertService;
    }
    // Let the UI know if we have a Widget to display in the form.
    get editing() {
        return (this.widgetEdit != null);
    }
    // When the component is initialized, retrieve the Widgets fromt the API
    ngOnInit() {
        this.getWidgets();
    }
    // get all the widgets from the API
    getWidgets() {
        this.service.getWidgets().subscribe(returnedWidgets => {
            this.widgets = returnedWidgets;
        });
    }
    // create an empty widget to populate the create form
    createWidget() {
        this.widgetEdit = new Widget();
    }
    // get the selected widget from the API to populate the edit form
    editWidget(id) {
        this.service.getWidget(id).subscribe(returnedWidget => {
            this.widgetEdit = returnedWidget;
            this.widgetEdit.lastDesignReview = this.widgetEdit.lastDesignReview.substring(0, 10);
        });
    }
    // removes the selected widget from the API
    deleteWidget(id) {
        this.service.deleteWidget(id).subscribe(success => {
            this.alertService.success("Widget deleted successfully.");
            this.getWidgets();
        });
    }
    // exit out of the edit process without updating
    cancelEdit() {
        this.alertService.success("Widget update cancelled.");
        this.resetEdit();
    }
    // exit out of the create process without updating
    cancelCreate() {
        this.alertService.success("Widget creation cancelled.");
        this.resetEdit();
    }
    // determine if the submit is for a create or an edit
    onSubmit() {
        if (!this.widgetEdit.id) {
            this.saveCreate();
        }
        else {
            this.saveEdit();
        }
    }
    // save the updated widget to the API
    saveEdit() {
        this.service.putWidget(this.widgetEdit).pipe(first()).subscribe(success => {
            this.resetEdit();
            this.getWidgets();
            this.alertService.success("Widget Updated.", false);
        }, error => {
            this.alertService.error("Widget update failed.", false);
        });
    }
    // save the new widget to the API
    saveCreate() {
        this.service.postWidget(this.widgetEdit).pipe(first()).subscribe(returnedWidget => {
            this.resetEdit();
            this.getWidgets();
            this.alertService.success("Widget Created.", false);
        }, error => {
            this.alertService.error("Widget update failed.", false);
        });
    }
    // after editing reset the component
    resetEdit() {
        this.widgetEdit = null;
    }
};
WidgetsComponent = __decorate([
    Component({
        selector: 'app-widgets',
        templateUrl: './widgets.component.html',
        styleUrls: ['./widgets.component.css']
    }),
    __metadata("design:paramtypes", [WidgetsService, AlertService])
], WidgetsComponent);
export { WidgetsComponent };
//# sourceMappingURL=widgets.component.js.map