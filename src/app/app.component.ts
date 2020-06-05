import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  myForms :FormGroup;

  ngOnInit(){
    this.myForms = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'email': new FormControl(null, [Validators.required, Validators.email]),
      }),
      'gender': new  FormControl('male',Validators.required),
      'hobbies': new FormArray([])
    })
  }

  onSubmit(){
    console.log(this.myForms.value);
  }

  addHobby(){
    const controls = new FormControl(null,Validators.required);
    (<FormArray>this.myForms.get('hobbies')).push(controls)
  }

  getControls(){
    return (<FormArray>this.myForms.get('hobbies')).controls;
  }
}
