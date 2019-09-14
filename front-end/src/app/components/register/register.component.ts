import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  form: FormGroup;

  constructor(
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl(null, Validators.required),
      code: new FormControl(null, Validators.required),
      plate: new FormControl(null, Validators.required),
      phone: new FormControl(null, Validators.required),
      career: new FormControl(null, Validators.required),
      mail: new FormControl(null, [Validators.email, Validators.email]),
      password: new FormControl(null, Validators.required),
    });
  }

  register() {
    console.log(this.form.value);
  }

}
