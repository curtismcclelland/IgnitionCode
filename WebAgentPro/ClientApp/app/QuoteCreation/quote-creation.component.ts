import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.css']
})
export class QuoteCreationComponent implements OnInit {

  step: any = 1;

  constructor() { }

  submit(){
    this.step = this.step + 1;
  }

  previous(){
    this.step = this.step - 1;
  }

  ngOnInit(): void {
  }

}
