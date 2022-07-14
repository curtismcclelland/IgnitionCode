import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.css']
})

export class QuoteCreationComponent implements OnInit {

  apiUrl: string = environment.apiUrl
  quoteParamSubscription: Subscription
  quote: Quote
  action: string
  step: any = 6;
  
  public userForm: FormGroup;
  get firstName(){ return this.userForm.get('firstName'); }
  get lastName(){ return this.userForm.get('lastName'); }
  get address(){ return this.userForm.get('address'); }
  get city(){ return this.userForm.get('city'); }
  get state(){ return this.userForm.get('state'); }
  get zip(){ return this.userForm.get('zip'); }
  get ssn(){ return this.userForm.get('ssn'); }
  get dateOfBirth(){ return this.userForm.get('dateOfBirth'); }

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.quoteParamSubscription = this.route.params.subscribe(
      params => {
          this.action = params['action']


          switch (this.action) {
              case "add":
                  this.initializeQuote(params['quoteId'])
                  break
              case "edit":
                  this.getQuote(params['quoteId'])
                  break
          }
      })

      this.userForm = this.fb.group({
        firstName: ['', [Validators.required, Validators.minLength(2)]],
        lastName: ['', [Validators.required, Validators.minLength(2)]],
        address: ['', [Validators.required, Validators.minLength(2)]],
        city: ['', [Validators.required, Validators.minLength(2)]],
        state: ['', [Validators.required]],
        zip: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        ssn: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        dateOfBirth: [null, [Validators.required, Validators.pattern("^[0-9]*$")]],
        safeDrivingSchool: [false, [Validators.requiredTrue,]]
      })

      this.userForm.valueChanges.subscribe(console.log);
    }

    //This method would be called if you were to exit out early during
    //creation or editing. This will change when we have partial quotes
    //being saved and marked as uncompleted. 
    ngOnDestroy() {
        this.quoteParamSubscription.unsubscribe();
    }

    submitForm() {
      switch (this.action) {
          case "add":
              this.postQuote(this.quote);
              break;
          case "edit":
              this.putQuote(this.quote);
              break;
      }
    }

    initializeQuote(quoteId: number) {
      this.quote = new Quote;
      this.quote.quoteId = quoteId;
    }

    getQuote(quoteId: number) {
      var httpRequest = this.http.get<Quote>(`${this.apiUrl}/quotes/${quoteId}`);

      httpRequest.subscribe(
          returnedQuote => {
              this.quote = returnedQuote
          }
      );
    }

    putQuote(updatedQuote: Quote) {
      var httpRequest = this.http.put(`${this.apiUrl}/quotes/${updatedQuote.quoteId}`, updatedQuote)

      httpRequest.subscribe(
          success => {
              this.router.navigateByUrl("/quotes")
          });
    }

    postQuote(newQuote: Quote) {
      var httpRequest = this.http.post<number>(`${this.apiUrl}/quotes`, newQuote);

      httpRequest.subscribe(
          success => {
              this.router.navigateByUrl("/quotes")
          });
    }


    //These methods are used by the corresponding html to keep track
    //of the page on which quote creation resides
    previous() { this.step = this.step - 1; }
    continue() { this.step = this.step + 1; }

    listOfStates: string[] = [
      "Alaska",
      "Alabama",
      "Arkansas",
      "American Samoa",
      "Arizona",
      "California",
      "Colorado",
      "Connecticut",
      "District of Columbia",
      "Delaware",
      "Florida",
      "Georgia",
      "Guam",
      "Hawaii",
      "Iowa",
      "Idaho",
      "Illinois",
      "Indiana",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Massachusetts",
      "Maryland",
      "Maine",
      "Michigan",
      "Minnesota",
      "Missouri",
      "Mississippi",
      "Montana",
      "North Carolina,",
      "North Dakota",
      "Nebraska",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "Nevada",
      "New York",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Puerto Rico",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Virginia",
      "Virgin Islands",
      "Vermont",
      "Washington",
      "Wisconsin",
      "West Virginia",
      "Wyoming"]
}
