import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forms';
  defaultQuestion = "pet"
  answer = '';
  genders=['Male', 'Female'];
  submitted = false;
  user = {
    username:'',
    email:'',
    secret:'',
    answer:'',
    reply:'',
    gender:'',
  }
  @ViewChild('f')forms:NgForm
  suggestUserName() {
    const suggestedName = 'Superuser';
    // this.forms.form.setValue({}) Overwrites the existing data in the form

    //patch value updates the existing field alone
    this.forms.form.patchValue({
      userData:{
        username:suggestedName
      }
    })
  }

  onSubmit(){
    this.user.username = this.forms.value.userData.username;
    this.user.email = this.forms.value.userData.email;
    this.user.secret = this.forms.value.secret;
    this.user.answer = this.forms.value.reply;
    this.user.gender = this.forms.value.gender;
    this.submitted = true;
    console.log(this.forms);
    this.forms.reset();
  }
}
