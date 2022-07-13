import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quote-search',
  templateUrl: './quote-search.component.html',
  styleUrls: ['./quote-search.component.css']
})
export class QuoteSearchComponent implements OnInit {

    apiUrl: string = environment.apiUrl
    quotes: Quote[]
    

  constructor() { }

  ngOnInit(): void {
  }

}
