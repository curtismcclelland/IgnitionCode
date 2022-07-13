import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-quote-creation',
  templateUrl: './quote-creation.component.html',
  styleUrls: ['./quote-creation.component.css']
})
export class QuoteCreationComponent implements OnInit {

  step: any = 1;

  public userForm: FormGroup;
  first_name: string = "";
  last_name: string = "";
  address: string = "";
  city: string = "";
  state: string = "";
  zip: number = 0;
  ssn: number = 0;
  dob: string = "";

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      first_name: "",
      last_name: "",
      address:"",
      city:"",
      state:"",
      zip:0,
      ssn:0,
      dob:""
    })
  }

  submit(){
    this.first_name = this.userForm.get("first_name")?.value;
    this.last_name = this.userForm.get("last_name")?.value;
    this.address = this.userForm.get("address")?.value;
    this.city = this.userForm.get("city")?.value;
    this.zip = this.userForm.get("zip")?.value;
    this.ssn = this.userForm.get("ssn")?.value;
    this.dob = this.userForm.get("dob")?.value;
    console.log(this.first_name)
  }

  previous(){
    this.step = this.step - 1;
  }

  continue(){
    this.step = this.step + 1;
  }

  ngOnInit(): void {
  }

}
