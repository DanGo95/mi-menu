import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Recipe } from '../interfaces/recipe';


@Injectable({
  providedIn: 'root'
})

export class MenuService{

  menu: Recipe[] = [];
  vegan = 0;
  noVegan = 0;
  avgTime = 0;
  totalPrice = 0;
  avgHealthScore = 0;

  subject = new BehaviorSubject(this.menu);

  constructor() {
    this.menu = JSON.parse(localStorage.getItem('menu') ?? '[]');
    
    this.menu.forEach(recipe => {
      this.increaseCount(recipe);
    });

    this.updateStates();
    this.subject.next(this.menu);
  }

  getMenu(){
    return this.subject;
  }

  addRecipe( recipe: Recipe ) {
    this.increaseCount(recipe);
    this.menu.push(recipe);
    localStorage.setItem('menu', JSON.stringify(this.menu));
    this.updateStates();
    this.subject.next(this.menu);
  }

  deleteRecipe( recipe: Recipe ) {
    this.menu = this.menu.filter( element => element.id != recipe.id);
    this.decreaseCount(recipe);
    localStorage.setItem('menu', JSON.stringify(this.menu));
    this.updateStates();
    this.subject.next(this.menu);
  }

  isComplete(menu: Recipe[]) {
    if (menu.length > 3) {
      return true
    } else {
      return false
    }
  }

  private increaseCount( recipe: Recipe ) {
    if (recipe.vegan) {
      this.vegan++
    } else {
      this.noVegan++
    }
  }

  private decreaseCount( recipe: Recipe ) {
    if (recipe.vegan) {
      this.vegan--
    } else {
      this.noVegan--
    }
  }

  private calculatePrice( menu: Recipe[] ) {
    let price = 0;
    menu.forEach(recipe => {
      price += recipe.pricePerServing * recipe.servings;
    });

    return price;
  }

  private updateStates() {
    this.totalPrice = this.calculatePrice(this.menu);
    this.avgTime = this.calculateAvgTime(this.menu);
    this.avgHealthScore = this.calculateAvgHealthScore(this.menu);
  }

  private calculateAvgTime( menu: Recipe[] ) {
    let totalTime = 0;
    menu.forEach(recipe => {
      totalTime += recipe.readyInMinutes;
    });

    let avgTime = totalTime / menu.length
    return avgTime;
  }

  private calculateAvgHealthScore( menu: Recipe[] ) {
    let totalHealthScore = 0;
    menu.forEach(recipe => {
      totalHealthScore += recipe.healthScore;
    })

    let avgHealthScore = totalHealthScore / menu.length
    return avgHealthScore;
  }

  checkLimit(recipe: Recipe) {
    if (recipe.vegan) {
      if ( (this.vegan + 1) > 2 ) {
        return false;
      }
      return true;
    } else {
      if ( (this.noVegan + 1) > 2 ) {
        return false;
      }
      return true;
    }
  }

}
