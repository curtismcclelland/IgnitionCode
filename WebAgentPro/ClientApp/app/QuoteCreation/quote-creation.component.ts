import { Component, OnInit } from '@angular/core';
import { AbstractControl, Form, FormControl, FormGroup, Validators } from '@angular/forms';
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
  driver: Driver
  vehicle: Vehicle
  action: string
  step: any = 7;

  currentQuoteId: number = 1;
  currentDriverId: number = 1;
  currentVehicleId: number = 1;
 
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
  movingViolationInLast5Years: FormControl;
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
    // CUSTOMER INFO - PG 1
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
    });

    // CUSTOMER HISTORY - PG 2
    this.lessThan3YearsDriving = new FormControl(false, []);
    this.previousCarrier = new FormControl(null, [Validators.required]);
    this.movingViolationInLast5Years = new FormControl(false, []);
    this.claimInLast5Years = new FormControl(false, []);
    this.forceMultiCarDiscount = new FormControl(false, []);
    this.isCustomerDriver = new FormControl(false, []);
    this.customerHistory = new FormGroup({
      lessThan3YearsDriving: this.lessThan3YearsDriving,
      previousCarrier: this.previousCarrier,
      movingViolationInLast5Years: this.movingViolationInLast5Years,
      claimInLast5Years: this.claimInLast5Years,
      forceMultiCarDiscount: this.forceMultiCarDiscount,
      isCustomerDriver: this.isCustomerDriver,
    });

    // DRIVER INFO - PG 3
    this.driverFirstName = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.driverLastName= new  FormControl('', [Validators.required, Validators.minLength(2)]);
    this.driverSSN= new  FormControl(null, [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.driverLicenseNumber= new  FormControl(null, [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.driverLicenseState= new  FormControl('', Validators.required);
    this.driverDOB= new  FormControl(null, [Validators.required]);
    this.driverSafeDrivingSchool= new  FormControl(false, []);
    // this.driverQuoteMultiplier= new  FormControl
    this.driverInfo = new FormGroup({
      driverFirstName:this.driverFirstName,
      driverLastName:this.driverLastName,
      driverSSN:this.driverSSN,
      driverLicenseNumber:this.driverLicenseNumber,
      driverLicenseState:this.driverLicenseState,
      driverDOB:this.driverDOB,
      driverSafeDrivingSchool:this.driverSafeDrivingSchool,
    })

    // VEHICLE INFO PG 4public vehicleInfo: FormGroup;
    this.vin = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.make = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.model = new FormControl('', [Validators.required, Validators.minLength(2)]);
    this.year = new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.currentValue = new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.annualMileage = new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.daysDrivenPerWeek = new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required]);
    this.milesDrivenToWork = new FormControl('', [Validators.pattern("^[0-9]*$"),Validators.required]);
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
  createForm(){
    this.userForm = new FormGroup({
      customerInfo: this.customerInfo,
      customerHistory: this.customerHistory,
      driverInfo: this.driverInfo,
      vehicleInfo: this.vehicleInfo,
      vehicleChecklist: this.vehicleChecklist,
    })
  }

  ngOnInit(): void {
    this.createFormControls();
    this.createForm();

    this.initializeQuote();

    this.userForm.valueChanges.subscribe(console.log); // printing form data on every value change
    }

    //This method would be called if you were to exit out early during
    //creation or editing. This will change when we have partial quotes
    //being saved and marked as uncompleted. 
    ngOnDestroy() {
        this.quoteParamSubscription.unsubscribe();
    }

    updateDriverInfo(){
      // this.driver.driverId = this.currentDriverId;
      this.driver.firstName = this.driverFirstName.value;
      this.driver.lastName = this.driverLastName.value;
      this.driver.ssn = this.driverSSN.value;
      this.driver.driverLicenseNumber = this.driverLicenseNumber.value;
      this.driver.driverLicenseState = this.driverLicenseState.value;
      this.driver.dateOfBirth = this.driverDOB.value;
      this.driver.safeDrivingSchool = this.driverSafeDrivingSchool.value;
      this.driver.quoteMultiplier = this.driverQuoteMultiplier.value;
      // this.driver.quoteId = this.quote.quoteId; REPEAT THIS FOR VEHICLE
    }
    updateVehicleInfo(){
      // this.vehicle.vehicleId = this.currentVehicleId;
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
    }
    updateQuoteInfo(){
      // this.driver.driverId = this.currentDriverId;
      this.quote.firstName = this.firstName.value;
      this.quote.lastName = this.lastName.value;
      this.quote.address = this.address.value;
      this.quote.city = this.city.value;
      this.quote.state = this.state.value;
      this.quote.zip = this.zip.value;
      this.quote.ssn = this.ssn.value;
      this.quote.dateOfBirth = this.dateOfBirth.value;
      this.quote.lessThan3YearsDriving = this.lessThan3YearsDriving.value;
      this.quote.previousCarrier = this.previousCarrier.value;
      this.quote.movingViolationInLast5Years = this.movingViolationInLast5Years.value;
      this.quote.claimInLast5Years = this.claimInLast5Years.value;
      this.quote.forceMultiCarDiscount = this.forceMultiCarDiscount.value;
      // this.driver.quoteId = this.quote.quoteId; REPEAT THIS FOR VEHICLE
    }

    // Adjust for multiple Drivers and Vehicles later
    submitForm() {
      this.updateDriverInfo();
      this.updateVehicleInfo();
      this.updateQuoteInfo();

      console.log(this.quote)
      console.log(this.driver)
      console.log(this.vehicle)

      // this.postQuote(this.quote);
    }

    // CHANGE THIS FUNTION!!!!!!!!!!!
    initializeQuote() {
      this.quote = new Quote;
      this.driver = new Driver;
      this.vehicle = new Vehicle;
      // this.quote.quoteId = quoteId;
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

    //Quote pricing

    calculateQuotePrice() {
      var driverBaseCost = 200;
      var vehicleBaseCost = 200;
      var policyBaseCost = 100;
      var driverQuoteMultiplier = 1;
      var vehicleQuoteMultiplier = 1;
      var currentQuoteQuoteMultiplier = 1;

   
          if (this.driver.safeDrivingSchool == true) {
              driverQuoteMultiplier *= .95;
          }
          if (Date.now() - new Date(this.driver.dateOfBirth).getTime() < 23) {
              driverQuoteMultiplier *= .95;
      }
      var driverSubtotalCost = driverBaseCost *= driverQuoteMultiplier;

      if (this.vehicle.annualMileage < 6000) {
          vehicleQuoteMultiplier *= .98;
      }
      if (this.vehicle.antiTheft == true) {
          vehicleQuoteMultiplier *= .97;
      }
      if (this.vehicle.daysDrivenPerWeek > 4) {
          vehicleQuoteMultiplier *= 1.02;
      }
      if (this.vehicle.milesDrivenToWork < 25) {
          vehicleQuoteMultiplier *= .98;
      }
      if (this.vehicle.daytimeRunningLights == true) {
          vehicleQuoteMultiplier *= .99;
      }
      if (this.vehicle.garageAddressDifferentFromResidence == true) {
          vehicleQuoteMultiplier *= 1.03;
      }
      if (this.vehicle.passiveRestraints == true) {
          vehicleQuoteMultiplier *= .97;
      }
      if (this.vehicle.reducedUsedDiscount == true) {
          vehicleQuoteMultiplier *= .94
      }
      var vehicleSubtotalCost = vehicleBaseCost *= vehicleQuoteMultiplier;

      if (this.quote.claimInLast5Years == true) {
          currentQuoteQuoteMultiplier *= 1.2;
      }
      if (this.quote.forceMultiCarDiscount == true) {
          currentQuoteQuoteMultiplier *= .95;
      }
      if (this.quote.movingViolationInLast5Years == true) {
          currentQuoteQuoteMultiplier *= 1.20;
      }
      if (this.quote.previousCarrierLizard) {
          currentQuoteQuoteMultiplier *= 1.05;
      }
      if (this.quote.previousCarrierPervasive) {
          currentQuoteQuoteMultiplier *= .97;
      }
      var policySubtotal = policyBaseCost *= currentQuoteQuoteMultiplier;
      console.log("Your total vehicle cost is: ", vehicleSubtotalCost);
      console.log("Your total driver cost is: ", driverSubtotalCost);
      console.log("You total policy cost is: ", policySubtotal);
  }
}
