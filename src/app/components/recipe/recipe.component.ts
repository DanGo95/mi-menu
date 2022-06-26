import { Component, Input, OnInit, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { Recipe } from '../../interfaces/recipe';
import { Router } from '@angular/router';
import { MenuService } from '../../services/menu.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit{

  @Input() recipes!: Recipe[];

  menu!: Recipe[];

  constructor( private router: Router, private menuService: MenuService ) { 
  }

  ngOnInit(): void {
    this.menuService.getMenu().subscribe( menu => {
      this.menu = menu;
    })
  }
  
  // ngOnChanges(changes: SimpleChanges) {
  //   // console.log(changes['recipes'].currentValue);
  //   console.log(this.recipes);
  // }

  onRecipeClick( recipe: Recipe  ) {
    this.router.navigate(['/recipe', recipe.id])
  }

  existInMenu( recipe: Recipe ) {
    return this.menu.find(element => element.id == recipe.id);
  }

  removeFromMenu( recipe: Recipe ) {
    this.menuService.deleteRecipe(recipe);
    Swal.fire({
      icon: 'success',
      text: 'El plato se eliminó del menú',
      confirmButtonColor: '#ff0253'
    })
  }

  addToMenu( recipe: Recipe ) {
    if (this.menuService.isComplete(this.menu)) {
      Swal.fire({
        icon: 'error',
        text: 'El menú ya está completo',
        confirmButtonColor: '#ff0253',
      })
    } else {
      if ( this.menuService.checkLimit(recipe) ) {
        this.menuService.addRecipe(recipe);
        Swal.fire({
          icon: 'success',
          title: 'El plato fue agregado correctamente',
          text: 'Para ver el menú completo, vaya a la página de inicio.',
          confirmButtonColor: '#ff0253'
        })
      } else {
        Swal.fire({
          icon: 'error',
          text: 'No puede agregar más platos de este tipo',
          confirmButtonColor: '#ff0253'
        })
      }
    }
  }

}
