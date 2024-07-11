import { Inject, Injectable } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private _keycloakService: KeycloakService){}

  getRoles() {
    return this._keycloakService.getUserRoles();
  }

  isAdmin(){
    const roles = this._keycloakService.getUserRoles().filter( role => role == "admin");

    if (roles.length === 0) return false;
    return true;
  }
}
