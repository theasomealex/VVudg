import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/services.index';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  // Se hace uso del formGroup, para poder utilizarlo en el html.
  form: FormGroup;

  constructor(
    // Se hace uso del servicio user
    public _userService: UserService
  ) { }

  ngOnInit() {
    // Se declaran las variables utilizadas en el formulario, con su respectiva validación
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
    // Se muestra en consola lo que se está enviando por medio del formulario
    console.log(this.form.value);
    // Son los valores que se van a guardar del formulario
    const user = new User(
      this.form.value.username,
      this.form.value.code,
      this.form.value.plate,
      this.form.value.phone,
      this.form.value.career,
      this.form.value.mail,
      this.form.value.password,
    );
    this._userService.postUser(user)
      .subscribe(res => {
        console.log(res);
      });
  }
}
