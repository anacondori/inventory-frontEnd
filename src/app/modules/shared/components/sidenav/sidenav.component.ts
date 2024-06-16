import { MediaMatcher } from '@angular/cdk/layout';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  public mobileQuery: MediaQueryList;
  public menuNav = [
    {name: "Home", route: "home", icon:"home"},
    {name: "Categorias", route: "category", icon:"category"},
    {name: "Productos", route: "product", icon:"production_quantity_limits"},
  ];

  constructor(private _media: MediaMatcher){
    this.mobileQuery = _media.matchMedia('(max-width: 600px)');
  }

}
