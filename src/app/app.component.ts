import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  hobbies = ['Fishing', 'Gaming', 'Reading', 'Jogging'];
  invalidUsername = ['ainrobin', 'ainmutaqorrobin'];
  invalidEmail = 'ainmutaqorrobin@gmail.com';
  signupForm: FormGroup;

  //set up getter
  get controls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.checkInvalidUsernames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.checkInvalidEmail.bind(this)
        ),
      }),
      gender: new FormControl('female'),
      hobbies: new FormArray([], Validators.required),
    });
  }

  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  onSubmit() {
    console.log(this.signupForm.value);
  }

  checkInvalidUsernames(control: FormControl): { [s: string]: boolean } {
    if (this.invalidUsername.includes(control.value))
      return { 'Invalid username, please try another': true };
  }

  checkInvalidEmail(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'ainmutaqorrobin@gmail.com') {
          resolve({ invalidEmail: true });
        } else reject(null);
      }, 3000);
    });
    return promise;
  }
}
