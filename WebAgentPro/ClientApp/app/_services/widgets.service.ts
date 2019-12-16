import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Widget } from '@app/_models/widget';

@Injectable({ providedIn: 'root' })
export class WidgetsService {
    constructor(private http: HttpClient) { }

    apiUrl: string = environment.apiUrl;

    getWidgets() {
        return this.http.get<Widget[]>(`${this.apiUrl}/widgets`);
    }

    getWidget(id: number) {
        return this.http.get<Widget>(`${this.apiUrl}/widgets/${id}`);
    }

    putWidget(widget: Widget) {
        return this.http.put(`${this.apiUrl}/widgets/${widget.id}`, widget);
    }

    postWidget(widget: Widget) {
        return this.http.post<Widget>(`${this.apiUrl}/widgets`, widget);
    }

    deleteWidget(id: number) {
        return this.http.delete(`${this.apiUrl}/widgets/${id}`);
    }

}
