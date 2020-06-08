import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  myForms :FormGroup;
  invalidUsernames = ['John','Doe']
  ngOnInit(){
    this.myForms = new FormGroup({
      'userData': new FormGroup({
        'username': new FormControl(null, [Validators.required,this.checkValidity.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email],this.checkAsync),
      }),
      'gender': new  FormControl('male',Validators.required),
      'hobbies': new FormArray([])
    })
    // this.myForms.valueChanges
    //   .subscribe(value=>{
    //     console.log(value);
    //   })

    // this.myForms.statusChanges
    //   .subscribe(status=>{
    //     console.log(status);
    //   })
    
    // this.myForms.setValue({
    //   'userData':{
    //     'username':"Sushil",
    //     'email':'test@test.com'
    //   },
    //   'gender':'male',
    //   'hobbies':'coding'
    // })
    this.myForms.patchValue({
      'userData':{
        'username':'Sushil'
      }
    })
  }

  onSubmit(){
    console.log(this.myForms);
    this.myForms.reset();
  }

  addHobby(){
    const controls = new FormControl(null,Validators.required);
    (<FormArray>this.myForms.get('hobbies')).push(controls)
  }

  getControls(){
    return (<FormArray>this.myForms.get('hobbies')).controls;
  }

  checkValidity(control:FormControl):{[s:string]:boolean}{
    if(this.invalidUsernames.indexOf(control.value)!==-1){
      return {'nameIsForbidden':true};
    }else{
      return;
    }
  }

  checkAsync(control:FormControl):Promise<any>{
    const promise = new Promise<any>((resolve,reject)=>{
      setTimeout(()=>{
        if(control.value === "test@test.com"){
          resolve({'emailIsForbidden':true})
        }else{
          resolve(null);
        }
      },1500);
    });
      return promise;
  }
}
