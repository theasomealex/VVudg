// IMPORTS
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICES } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    // Se importa el httpClient para poder mandar a llamar las consultas
    public http: HttpClient
  ) {
    // Confirma que el servicio está listo para utilizarse
    console.log('Ok');
  }

  // Se manda llamar la consulta post desde el back-end
  postUser(user: User) {
    // Se declara la constante url, para poder hacer uso de la propiedad URL_SERVICES, contenida en el archivo config.ts
    const url = URL_SERVICES + '/user';
    return this.http.post(url, user);
  }

}
