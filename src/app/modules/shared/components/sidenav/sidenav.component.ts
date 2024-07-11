import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent implements OnInit {

  public mobileQuery: MediaQueryList;
  public menuNav = [
    {name: "Home", route: "home", icon:"home"},
    {name: "Categorias", route: "category", icon:"category"},
    {name: "Productos", route: "product", icon:"production_quantity_limits"},
  ];
  public userName: string = "";
  private _keycloakService = inject(KeycloakService);


  constructor(private _media: MediaMatcher){
    this.mobileQuery = _media.matchMedia('(max-width: 600px)');
  }

  ngOnInit(): void {
    this.userName = this._keycloakService.getUsername();
  }

  logout(){
    this._keycloakService.logout();
  }

}
