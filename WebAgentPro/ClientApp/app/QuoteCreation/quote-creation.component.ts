import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.css']
})
export class QuoteCreationComponent implements OnInit {

  step: any = 1;

  public userForm: FormGroup;
  // first_name: string = "";
  // last_name: string = "";
  // address: string = "";
  // city: string = "";
  // state: string = "";
  // zip: number;
  // ssn: number;
  // dob: string = "";
  // safeDrivingSchool: boolean = false;

  constructor(private fb: FormBuilder) {
  }

  submit(){
    // this.first_name = this.userForm.get("first_name")?.value;
    // this.last_name = this.userForm.get("last_name")?.value;
    // this.address = this.userForm.get("address")?.value;
    // this.city = this.userForm.get("city")?.value;
    // this.zip = this.userForm.get("zip")?.value;
    // this.ssn = this.userForm.get("ssn")?.value;
    // this.dob = this.userForm.get("dob")?.value;
    // console.log(this.first_name)
  }

  previous(){
    this.step = this.step - 1;
  }

  continue(){
    this.step = this.step + 1;
  }

  ngOnInit(): void {

    this.userForm = this.fb.group({
      first_name: ['', [ Validators.required, Validators.minLength(2) ]],
      last_name: ['', [ Validators.required, Validators.minLength(2) ]],
      address:['', [ Validators.required, Validators.minLength(2) ]],
      city:['', [ Validators.required, Validators.minLength(2) ]],
      state:['', [ Validators.required ]],
      zip:[null, [ Validators.required, Validators.pattern("^[0-9]*$")]],
      ssn:[null, [ Validators.required, Validators.pattern("^[0-9]*$")]],
      safeDrivingSchool: [false, [ Validators.requiredTrue,]]
    })

    this.userForm.valueChanges.subscribe(console.log)
  }

  get first_name(){ return this.userForm.get('first_name'); }
  get last_name(){ return this.userForm.get('last_name'); }
  get address(){ return this.userForm.get('address'); }
  get city(){ return this.userForm.get('city'); }
  get state(){ return this.userForm.get('state'); }
  get zip(){ return this.userForm.get('zip'); }
  get ssn(){ return this.userForm.get('ssn'); }
  get dob(){ return this.userForm.get('dob'); }
}
