import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { Driver } from '@app/_models/driver';
import { Vehicle } from '@app/_models/vehicle';
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
  step: any = 2;
 
  public userForm: FormGroup;
  public customerInfo: FormGroup; // called by template to check validation
  firstName: FormControl;
  lastName: FormControl;
  address: FormControl;
  city: FormControl;
  state: FormControl;
  zip: FormControl;
  ssn: FormControl;
  dateOfBirth: FormControl;
  lessThan3YearsDriving: boolean = false;
  previousCarrier: string = "AAA";
  movingViolationInLast5Years: boolean = false;
  claimInLast5Years: boolean = true;
  forceMultiCarDiscount: boolean = true;
  drivers: Array<Driver>;
  vehicles: Array<Vehicle>;

  //discount fields that are copied into the quote model
  daytimeRunningLights: number = 0;
  antilockBrakes: number = 0;
  lowAnnualMileage: number = 0;
  passiveRestraints: number = 0;
  antitheftInstalled: number;
  highDaysDrivenPerWeek: number = 0;
  lowMilesDrivenToWork: number = 0;
  reduceUse: number = 0;
  garageAddressDifferent: number = 0;
  lowDrivingExperience: number = 0;
  previousCarrierLizard: number = 0;
  previousCarrierPervasive: number = 0;
  recentMovingViolations: number = 0;
  recentClaims: number = 0;
  multiCar: number = 0;
  youngDriver: number = 0;
  safeDrivingSchool: number = 0;

  //more unique quote fields
  totalQuoteMultiplier: number = 0;
  quotePrice: number = 0;
  status: string;

  // Maybe this can be stored in the DB
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
    "Wyoming"
  ]

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  // Creates FormControls to link in template
  // <input ... formControlName="<name>" ... />
  createFormControls(){
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.address = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.city = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.state = new FormControl('', Validators.required);
    this.zip = new FormControl(null, [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.ssn = new FormControl(null, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.dateOfBirth = new FormControl(null, [Validators.required]);
    this.customerInfo = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      ssn: this.ssn,
      dateOfBirth: this.dateOfBirth
    })
  }

  // Creates the Form
  createForm(){
    this.userForm = new FormGroup({
      customerInfo: this.customerInfo,
    })
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm()
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

      this.userForm.valueChanges.subscribe(console.log); // printing form data on every value change
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
}
