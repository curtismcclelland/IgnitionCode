import { Component, OnInit } from '@angular/core';
import { WidgetsService } from '@app/_services/widgets.service';
import { Widget } from '@app/_models/widget';
import { AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.css']
})

export class WidgetsComponent implements OnInit {

    // Inject the WidgetService and AlertService instances
    constructor(private service: WidgetsService, private alertService: AlertService) { }

    widgets: Widget[];      // Hold the widgets returned from the API
    widgetEdit: Widget;     // Hold the widget currently being edited.

    // Let the UI know if we have a Widget to display in the form.
    get editing(): boolean {
        return (this.widgetEdit != null);
    }

    // When the component is initialized, retrieve the Widgets fromt the API
    ngOnInit() {
        this.getWidgets();
    }

    // get all the widgets from the API
    getWidgets() {
        this.service.getWidgets().subscribe(returnedWidgets => { this.widgets = returnedWidgets });
    }

    // create an empty widget to populate the create form
    createWidget() {
        this.widgetEdit = new Widget();
    }

    // get the selected widget from the API to populate the edit form
    editWidget(id: number) {
        this.service.getWidget(id).subscribe(
            returnedWidget => {
                this.widgetEdit = returnedWidget;
            });
    }

    // removes the selected widget from the API
    deleteWidget(id: number) {
        this.service.deleteWidget(id).subscribe(
            success => {
                this.alertService.success("Widget deleted successfully.");
                this.getWidgets();
            }
        )
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
        this.service.putWidget(this.widgetEdit).pipe(first()).subscribe(
            success => {
                this.resetEdit();
                this.getWidgets();
                this.alertService.success("Widget Updated.", false);
            },
            error => {
                this.alertService.error("Widget update failed.", false);
            })
    }

    // save the new widget to the API
    saveCreate() {
        this.service.postWidget(this.widgetEdit).pipe(first()).subscribe(
            returnedWidget => {
                this.resetEdit();
                this.getWidgets();
                this.alertService.success("Widget Created.", false);
            },
            error => {
                this.alertService.error("Widget update failed.", false);
            })
    }

    // after editing reset the component
    resetEdit() {
        this.widgetEdit = null;
    }
}
