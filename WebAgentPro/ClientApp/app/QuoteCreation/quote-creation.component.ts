import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators, ValidatorFn } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Quote } from '@app/_models/quote';
import { Driver } from '@app/_models/driver';
import { Vehicle } from '@app/_models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Discount } from '../_models/discount';


@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.css']
})

export class QuoteCreationComponent implements OnInit {

  currentUser: string = JSON.parse(localStorage.getItem('currentUser')).userName;
  apiUrl: string = environment.apiUrl
  quoteParamSubscription: Subscription
  quote: Quote
  driver: Driver
  vehicle: Vehicle
  currentDiscount: Discount
  action: string
  step: any = 1;

  public userForm: FormGroup;

  // CUSTOMER IFNO
  public customerInfo: FormGroup; // called by template to check validation
  firstName: FormControl;
  lastName: FormControl;
  address: FormControl;
  city: FormControl;
  state: FormControl;
  zip: FormControl;
  ssn: FormControl;
  dateOfBirth: FormControl;

  // CUSTOMER HISTORY
  public customerHistory: FormGroup;
  lessThan3YearsDriving: FormControl;
  previousCarrier: FormControl;
  movingVioliationInLast5Years: FormControl;
  claimInLast5Years: FormControl;
  forceMultiCarDiscount: FormControl;
  isCustomerDriver: FormControl;

  //discount fields that are copied into the quote model
  // drivers: Array<Driver>;
  // vehicles: Array<Vehicle>;
  // daytimeRunningLights: number = 0;
  // antilockBrakes: number = 0;
  lowAnnualMileage: number = 0;
  // passiveRestraints: number = 0;
  antitheftInstalled: number;
  highDaysDrivenPerWeek: number = 0;
  lowMilesDrivenToWork: number = 0;
  // reduceUse: number = 0;
  // garageAddressDifferent: number = 0;
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

  // DRIVER INFO
  public driverInfo: FormGroup;
  driverFirstName: FormControl
  driverLastName: FormControl
  driverSSN: FormControl
  driverLicenseNumber: FormControl
  driverLicenseState: FormControl
  driverDOB: FormControl
  driverSafeDrivingSchool: FormControl
  driverQuoteMultiplier: any = 1 // REVISIT
  // driverQuoteMultiplier: FormControl

  // VEHICLE INFO
  public vehicleInfo: FormGroup;
  vin: FormControl;
  make: FormControl;
  model: FormControl;
  year: FormControl;
  currentValue: FormControl;
  annualMileage: FormControl;
  daysDrivenPerWeek: FormControl;
  milesDrivenToWork: FormControl;

  // VEHICLE CHECKLIST
  public vehicleChecklist: FormGroup;
  antiTheftAlarms: FormControl;
  antiLockBrakes: FormControl;
  daytimeRunningLights: FormControl;
  garageAddressDifferent: FormControl;
  passiveRestraints: FormControl;
  reduceUse: FormControl;

  vehicleSubtotalCost: number = 0;
  driverSubtotalCost: number = 0;
  policySubtotal: number = 0;


  listOfStatesObj = [
    { abbr: "AL", name: "Alabama" },
    { abbr: "AK", name: "Alaska" },
    { abbr: "AS", name: "American Samoa" },
    { abbr: 'AZ', name: 'Arizona' },
    { abbr: 'AR', name: 'Akasas' },
    { abbr: 'CA', name: 'California' },
    { abbr: 'CO', name: 'Colorado' },
    { abbr: 'CT', name: 'Connecticut' },
    { abbr: 'DE', name: 'Delaware' },
    { abbr: 'DC', name: 'District Of Columbia' },
    { abbr: 'FM', name: 'Federated States Of Micronesia' },
    { abbr: 'FL', name: 'Florida' },
    { abbr: 'GA', name: 'Georgia' },
    { abbr: 'GU', name: 'Guam' },
    { abbr: 'HI', name: 'Hawaii' },
    { abbr: 'ID', name: 'Idaho' },
    { abbr: 'IL', name: 'Illinois' },
    { abbr: 'IN', name: 'Indiana' },
    { abbr: 'IA', name: 'Iowa' },
    { abbr: 'KS', name: 'Kansas' },
    { abbr: 'KY', name: 'Kentucky' },
    { abbr: 'LA', name: 'Louisiana' },
    { abbr: 'ME', name: 'Maine' },
    { abbr: 'MH', name: 'Marshall Islands' },
    { abbr: 'MD', name: 'Maryland' },
    { abbr: 'MA', name: 'Massachusetts' },
    { abbr: 'MI', name: 'Michigan' },
    { abbr: 'MN', name: 'Minnesota' },
    { abbr: 'MS', name: 'Mississippi' },
    { abbr: 'MO', name: 'Missouri' },
    { abbr: 'MT', name: 'Montana' },
    { abbr: 'NE', name: 'Nebraska' },
    { abbr: 'NV', name: 'Nevada' },
    { abbr: 'NH', name: 'New Hampshire' },
    { abbr: 'NJ', name: 'New Jersey' },
    { abbr: 'NM', name: 'New Mexico' },
    { abbr: 'NY', name: 'New York' },
    { abbr: 'NC', name: 'North Carolina' },
    { abbr: 'ND', name: 'North Dakota' },
    { abbr: 'MP', name: 'Northern Mariana Islands' },
    { abbr: 'OH', name: 'Ohio' },
    { abbr: 'OK', name: 'Oklahoma' },
    { abbr: 'OR', name: 'Oregon' },
    { abbr: 'PW', name: 'Palau' },
    { abbr: 'PA', name: 'Pennsylvania' },
    { abbr: 'PR', name: 'Puerto Rico' },
    { abbr: 'RI', name: 'Rhode Island' },
    { abbr: 'SC', name: 'South Carolina' },
    { abbr: 'SD', name: 'South Dakota' },
    { abbr: 'TN', name: 'Tennessee' },
    { abbr: 'TX', name: 'Texas' },
    { abbr: 'UT', name: 'Utah' },
    { abbr: 'VT', name: 'Vermont' },
    { abbr: 'VI', name: 'Virgin Islands' },
    { abbr: 'VA', name: 'Virginia' },
    { abbr: 'WA', name: 'Washington' },
    { abbr: 'WV', name: 'West Virginia' },
    { abbr: 'WI', name: 'Wisconsin' },
    { abbr: 'WY', name: 'Wyoming' },
  ]

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) { }

  // Creates FormControls to link in template
  // <input ... formControlName="<name>" ... />
  createFormControls() {
    // CUSTOMER INFO - PG 1
    this.firstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.lastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.address = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.city = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.state = new FormControl('', Validators.required);
    this.zip = new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.ssn = new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required, Validators.minLength(9), Validators.maxLength(9)]);//, Validators.min(9), Validators.max(9)]);
    this.dateOfBirth = new FormControl('', [Validators.required]);//, this.ageLimitValidator(16)]);
    this.customerInfo = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      address: this.address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      ssn: this.ssn,
      dateOfBirth: this.dateOfBirth
    });

    // CUSTOMER HISTORY - PG 2
    this.lessThan3YearsDriving = new FormControl(false, []);
    this.previousCarrier = new FormControl('', [Validators.required]);
    this.movingVioliationInLast5Years = new FormControl(false, []);
    this.claimInLast5Years = new FormControl(false, []);
    this.forceMultiCarDiscount = new FormControl(false, []);
    this.isCustomerDriver = new FormControl(false, []);
    this.customerHistory = new FormGroup({
      lessThan3YearsDriving: this.lessThan3YearsDriving,
      previousCarrier: this.previousCarrier,
      movingVioliationInLast5Years: this.movingVioliationInLast5Years,
      claimInLast5Years: this.claimInLast5Years,
      forceMultiCarDiscount: this.forceMultiCarDiscount,
      isCustomerDriver: this.isCustomerDriver,
    });

    // DRIVER INFO - PG 3
    this.driverFirstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.driverLastName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.driverSSN = new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.driverLicenseNumber = new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.driverLicenseState = new FormControl('', Validators.required);
    this.driverDOB = new FormControl('', [Validators.required]);
    this.driverSafeDrivingSchool = new FormControl(false, []);
    // this.driverQuoteMultiplier= new  FormControl
    this.driverInfo = new FormGroup({
      driverFirstName: this.driverFirstName,
      driverLastName: this.driverLastName,
      driverSSN: this.driverSSN,
      driverLicenseNumber: this.driverLicenseNumber,
      driverLicenseState: this.driverLicenseState,
      driverDOB: this.driverDOB,
      driverSafeDrivingSchool: this.driverSafeDrivingSchool,
    })

    // VEHICLE INFO PG 4public vehicleInfo: FormGroup;
    this.vin = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.make = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.model = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.year = new FormControl(0, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.currentValue = new FormControl(0, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.annualMileage = new FormControl(0, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.daysDrivenPerWeek = new FormControl(0, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.milesDrivenToWork = new FormControl(0, [Validators.pattern("^[0-9]*$"), Validators.required]);
    this.vehicleInfo = new FormGroup({
      vin: this.vin,
      make: this.make,
      model: this.model,
      year: this.year,
      currentValue: this.currentValue,
      annualMileage: this.annualMileage,
      daysDrivenPerWeek: this.daysDrivenPerWeek,
      milesDrivenToWork: this.milesDrivenToWork,
    });

    // VEHICLE CHECKLIST PG 4
    this.antiTheftAlarms = new FormControl(false, []);
    this.antiLockBrakes = new FormControl(false, []);
    this.daytimeRunningLights = new FormControl(false, []);
    this.garageAddressDifferent = new FormControl(false, []);
    this.passiveRestraints = new FormControl(false, []);
    this.reduceUse = new FormControl(false, []);
    this.vehicleChecklist = new FormGroup({
      antiTheftAlarms: this.antiTheftAlarms,
      antiLockBrakes: this.antiLockBrakes,
      daytimeRunningLights: this.daytimeRunningLights,
      garageAddressDifferent: this.garageAddressDifferent,
      passiveRestraints: this.passiveRestraints,
      reduceUse: this.reduceUse,
    })
  }

  driverPrice: number = 0;
  vehiclePrice: number = 0;
  totalCost: number = 0;

  // Creates the Form
  createForm() {
    this.userForm = new FormGroup({
      customerInfo: this.customerInfo,
      customerHistory: this.customerHistory,
      driverInfo: this.driverInfo,
      vehicleInfo: this.vehicleInfo,
      vehicleChecklist: this.vehicleChecklist,
    })
  }

  ageLimitValidator(minAge: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      // if control value is not null and is a number
      if (control.value !== null) {
        // return null  if it's in between the minAge and maxAge and is A valid Number
        const today = new Date();
        const birthDate = new Date(this.dateOfBirth.value);
        birthDate.setMinutes(birthDate.getMinutes() + birthDate.getTimezoneOffset());
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }

        return age < minAge // checks if its below the minimum age
          ? { ageLimit: true } // return this incase of error
          : null; // there was not error
      }
      return null;
    };
  }

    ngOnInit(): void {
        this.quoteParamSubscription = this.route.params.subscribe(
            params => {

            });
    this.createFormControls();
    this.createForm();

    this.initializeQuote();

    this.userForm.valueChanges.subscribe(console.log); // printing form data on every value change
  }

  ngOnDestroy() {
    this.quoteParamSubscription.unsubscribe();
  }

  updateDriverInfo() {
    //this.fillDriverDefaults();
    this.driver = new Driver;
    this.driver.firstName = this.driverFirstName.value;
    this.driver.lastName = this.driverLastName.value;
    this.driver.ssn = this.driverSSN.value;
    this.driver.driverLicenseNumber = this.driverLicenseNumber.value;
    this.driver.driverLicenseState = this.driverLicenseState.value;
    this.driver.dateOfBirth = this.driverDOB.value;
    this.driver.safeDrivingSchool = this.driverSafeDrivingSchool.value;
    this.driver.quoteMultiplier = this.driverQuoteMultiplier.value;
    this.driver.quoteId = this.quote.quoteId;

    this.postDriver(this.driver);
    this.quote.drivers.push(this.driver);
    this.putQuote(this.quote);
    this.continue();
  }
  updateVehicleInfo() {
    this.fillVehicleDefaults();

    this.vehicle.vin = this.vin.value;
    this.vehicle.make = this.make.value;
    this.vehicle.model = this.model.value;
    this.vehicle.year = this.year.value;
    this.vehicle.currentValue = this.currentValue.value;
    this.vehicle.annualMileage = this.annualMileage.value;
    this.vehicle.daytimeRunningLights = this.daytimeRunningLights.value;
    this.vehicle.antiLockBrakes = this.antiLockBrakes.value;
    this.vehicle.passiveRestraints = this.passiveRestraints.value;
    this.vehicle.antiTheft = this.antiTheftAlarms.value;
    this.vehicle.daysDrivenPerWeek = this.daysDrivenPerWeek.value;
    this.vehicle.milesDrivenToWork = this.milesDrivenToWork.value;
    this.vehicle.reducedUsedDiscount = this.reduceUse.value;
    this.vehicle.garageAddressDifferentFromResidence = this.garageAddressDifferent.value;
    this.vehicle.quoteId = this.quote.quoteId;

    this.postVehicle(this.vehicle);
    this.quote.vehicles.push(this.vehicle);
    this.putQuote(this.quote);
    this.continue();
  }

  updateQuoteInfoFirstPage() {
    this.quote.firstName = this.firstName.value;
    this.quote.lastName = this.lastName.value;
    this.quote.address = this.address.value;
    this.quote.city = this.city.value;
    this.quote.state = this.state.value;
    this.quote.zip = this.zip.value;
    this.quote.ssn = this.ssn.value;
    this.quote.dateOfBirth = this.dateOfBirth.value;
    this.getDiscount(this.quote.state);
    this.putQuote(this.quote);
    this.continue();
  }

  //Add
  setQuoteDiscountValues() {
    this.quote.daytimeRunningLights = this.currentDiscount.daytimeRunningLights;
    this.quote.antilockBrakes = this.currentDiscount.antilockBrakes;
    this.quote.lowAnnualMileage = this.currentDiscount.lowAnnualMileage;
    this.quote.passiveRestraints = this.currentDiscount.passiveRestraints;
    this.quote.antitheftInstalled = this.currentDiscount.antitheftInstalled;
    this.quote.highDaysDrivenPerWeek = this.currentDiscount.highDaysDrivenPerWeek;
    this.quote.lowMilesDrivenToWork = this.currentDiscount.lowMilesDrivenToWork;
    this.quote.reduceUse = this.currentDiscount.reduceUse;
    this.quote.garageAddressDifferent = this.currentDiscount.garageAddressDifferent;
    this.quote.lowDrivingExperience = this.currentDiscount.lowDrivingExperience;
    this.quote.previousCarrierLizard = this.currentDiscount.previousCarrierLizard;
    this.quote.previousCarrierPervasive = this.currentDiscount.previousCarrierPervasive;
    this.quote.recentMovingViolations = this.currentDiscount.recentMovingViolations;
    this.quote.recentClaims = this.currentDiscount.recentClaims;
    this.quote.multiCar = this.currentDiscount.multiCar;
    this.quote.youngDriver = this.currentDiscount.youngDriver;
    this.quote.safeDrivingSchool = this.currentDiscount.safeDrivingSchool;
  }

  getDiscount(state: string) {
    var httpRequest = this.http.get<Discount>(`${this.apiUrl}/discounts/${state}`);

    httpRequest.subscribe(
      returnedDiscount => {
        this.currentDiscount = returnedDiscount
      }
    );
  }

  updateQuoteInfoSecondPage() {
    this.quote.lessThan3YearsDriving = this.lessThan3YearsDriving.value;
    this.quote.previousCarrier = this.previousCarrier.value;
    this.quote.movingVioliationInLast5Years = this.movingVioliationInLast5Years.value;
    this.quote.claimInLast5Years = this.claimInLast5Years.value;
    this.quote.forceMultiCarDiscount = this.forceMultiCarDiscount.value;
    this.setQuoteDiscountValues();
    this.putQuote(this.quote);
    this.continue();
  }

  // REDIRECT TO AGENT/MANAGER DASHBOARD
  submitForm() {
    this.continue();
  }

  // TAKES USER TO QUOTE SUMMARY PAGE
  createQuote() {
    this.calculateQuotePrice();
    this.continue();
  }

  // INITIALIZE THE QUOTE MODEL OBJECT
  initializeQuote() {
    this.quote = new Quote;
    this.fillDefaults();
    this.postQuote(this.quote);
    this.driver = new Driver;
    this.vehicle = new Vehicle;
    this.currentDiscount = new Discount;
  }

  // USED TO INITIALIZE QUOTE WITH DUMMY DATA
  fillDefaults() {
    this.quote.creatorEmail = this.currentUser;
    this.quote.roleID = "";
    this.quote.firstName = "";
    this.quote.lastName = "";
    this.quote.address = "";
    this.quote.city = "";
    this.quote.state = "AA";
    this.quote.zip = "11111";
    this.quote.ssn = "1234567890";
    this.quote.dateOfBirth = "";
    this.quote.lessThan3YearsDriving = false;
    this.quote.previousCarrier = "";
    this.quote.movingVioliationInLast5Years = false;
    this.quote.claimInLast5Years = false;
    this.quote.forceMultiCarDiscount = false;
    this.quote.drivers = [];
    this.quote.vehicles = [];

    this.quote.daytimeRunningLights = 1;
    this.quote.antilockBrakes = 1;
    this.quote.lowAnnualMileage = 1;
    this.quote.passiveRestraints = 1;
    this.quote.antitheftInstalled = 1;
    this.quote.highDaysDrivenPerWeek = 1;
    this.quote.lowMilesDrivenToWork = 1;
    this.quote.reduceUse = 1;
    this.quote.garageAddressDifferent = 1;
    this.quote.lowDrivingExperience = 1;
    this.quote.previousCarrierLizard = 1;
    this.quote.previousCarrierPervasive = 1;
    this.quote.recentMovingViolations = 1;
    this.quote.recentClaims = 1;
    this.quote.multiCar = 1;
    this.quote.youngDriver = 1;
    this.quote.safeDrivingSchool = 1;
    this.quote.totalQuoteMultiplier = 1;
    this.quote.quotePrice = 1;
    this.quote.status = "st";
  }

  // USED TO INITIALIZE DRIVER WITH DUMMY DATA
  fillDriverDefaults() {

  }

  // USED TO INITIALIZE VEHICLE WITH DUMMY DATA
  fillVehicleDefaults() {

  }

  // USED TO FETCH QUOTE BASED ON QUOTE ID
  getQuote(quoteId: number) {
    var httpRequest = this.http.get<Quote>(`${this.apiUrl}/quotes/${quoteId}`);

    httpRequest.subscribe(
      returnedQuote => {
        this.quote = returnedQuote
      }
    );
  }

  // USED TO UPDATE PARTICULAR QUOTE
  putQuote(updatedQuote: Quote) {
    var httpRequest = this.http.put(`${this.apiUrl}/quotes/${updatedQuote.quoteId}`, updatedQuote)

    httpRequest.subscribe(
      success => {
        console.log(success)
        //this.router.navigateByUrl("/quotes")
      });
  }

  // USED TO POST QUOTES
  postQuote(newQuote: Quote) {
    var httpRequest = this.http.post<Quote>(`${this.apiUrl}/quotes`, newQuote);

    httpRequest.subscribe(
      success => {
        this.quote = success
        console.log(this.quote)
        //console.log(typeof (this.quote.quoteId))
        //console.log(this.quote)
      });
  }

  // USED TO POST DRIVE
  postDriver(newDriver: Driver) {
    var httpRequest = this.http.post<Driver>(`${this.apiUrl}/drivers`, newDriver);

    httpRequest.subscribe(
      success => {
        console.log(success);
        this.driver = success
        //this.router.navigateByUrl("/quotes")
      });
  }

  // USED TO POST VEHICLE
  postVehicle(newVehicle: Vehicle) {
    var httpRequest = this.http.post<Vehicle>(`${this.apiUrl}/vehicles`, newVehicle);

    httpRequest.subscribe(
      success => {
        this.vehicle = success
        //this.router.navigateByUrl("/quotes")
      });
  }


  // USED TO NAVIGATE BACK ONE STEP IN QUOTE CREATION PAGE
  previous() { this.step = this.step - 1; }

  // USED TO NAVIGATE FORWARD ONE STEP IN QUOTE CREATION PAGE
  continue() { this.step = this.step + 1; }

  // CALCULATE QUOTE PRICES
  calculateQuotePrice() {
    var driverBaseCost = 200;
    var vehicleBaseCost = this.vehicle.currentValue * 0.03;
    var policyBaseCost = 100;
    var driverQuoteMultiplier = 1;
    var vehicleQuoteMultiplier = 1;
    var currentQuoteQuoteMultiplier = 1;

    if (this.driver.safeDrivingSchool == true) {
      driverQuoteMultiplier *= 1 + this.quote.safeDrivingSchool;
    }

    var date = new Date();
    date.setDate(date.getDate());
    date.setMonth(date.getMonth());
    date.setFullYear(date.getFullYear() - 23);

    const birthDateasNumber = this.driver.dateOfBirth;
    const dateArray = birthDateasNumber.split('-');
    const year = Number(dateArray[0]);
    const month = Number(dateArray[1]);
    const day = Number(dateArray[2]);
    const dateOfBirthAsDate = new Date();
    dateOfBirthAsDate.setFullYear(year, month, day);

    if ((dateOfBirthAsDate.getTime()) > date.getTime()) {
      driverQuoteMultiplier *= 1 + this.quote.youngDriver;
    }

    this.driverSubtotalCost = +((driverBaseCost *= driverQuoteMultiplier).toFixed(2));

    if (this.vehicle.annualMileage < 6000) {
      vehicleQuoteMultiplier *= 1 + this.quote.lowAnnualMileage;
    }
    if (this.vehicle.antiTheft == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.antitheftInstalled;
    }
    if (this.vehicle.antiLockBrakes == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.antilockBrakes;
    }
    if (this.vehicle.daysDrivenPerWeek > 4) {
      vehicleQuoteMultiplier *= 1 + this.quote.highDaysDrivenPerWeek;
    }
    if (this.vehicle.milesDrivenToWork < 25) {
      vehicleQuoteMultiplier *= 1 + this.quote.lowMilesDrivenToWork;
    }
    if (this.vehicle.daytimeRunningLights == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.daytimeRunningLights;
    }
    if (this.vehicle.garageAddressDifferentFromResidence == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.garageAddressDifferent;
    }
    if (this.vehicle.passiveRestraints == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.passiveRestraints;
    }
    if (this.vehicle.reducedUsedDiscount == true) {
      vehicleQuoteMultiplier *= 1 + this.quote.reduceUse;
    }
    this.vehicleSubtotalCost = +((vehicleBaseCost *= vehicleQuoteMultiplier).toFixed(2));
    //policy base cost starts here
    var policyCost = this.vehicleSubtotalCost + this.driverSubtotalCost + policyBaseCost;

    if (this.quote.claimInLast5Years == true) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.recentClaims;
    }
    if (this.quote.forceMultiCarDiscount == true) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.multiCar;
    }
    if (this.quote.lessThan3YearsDriving == true) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.lowDrivingExperience;
    }
    if (this.quote.movingVioliationInLast5Years == true) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.recentMovingViolations;
    }
    if (this.quote.previousCarrierLizard) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.previousCarrierLizard;
    }
    if (this.quote.previousCarrierPervasive) {
      currentQuoteQuoteMultiplier *= 1 + this.quote.previousCarrierPervasive;
    }
    this.policySubtotal = +((policyCost *= currentQuoteQuoteMultiplier).toFixed(2));
    this.totalCost = this.policySubtotal;
    this.quote.quotePrice = this.totalCost;
    this.putQuote(this.quote);

    console.log("Your total vehicle cost is: ", this.vehicleSubtotalCost);
    console.log("Your total driver cost is: ", this.driverSubtotalCost);
    console.log("You total policy cost is: ", this.totalCost);
  }

}
