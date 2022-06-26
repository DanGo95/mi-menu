import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { Recipe } from '../../interfaces/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menu!: Recipe[];
  avgTime = 0;
  totalPrice = 0;
  avgHealthScore = 0;

  constructor( private menuService: MenuService ) {
    // this.recipes = this.menuService.getRecipes();
    this.avgHealthScore = this.menuService.avgHealthScore;
    this.totalPrice = this.menuService.totalPrice;
    this.avgTime = this.menuService.avgTime;
  }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe( menu => {
      this.menu = menu;
      this.updateStatus();
      }
    )
  }

  updateStatus() {
    this.avgHealthScore = this.menuService.avgHealthScore;
    this.totalPrice = this.menuService.totalPrice;
    this.avgTime = this.menuService.avgTime;
  }

}
