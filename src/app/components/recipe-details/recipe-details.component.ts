import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpoonacularService } from '../../services/spoonacular.service';
import { RecipeDetails } from '../../interfaces/recipe-details';
import { Location } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  public recipe!: RecipeDetails;

  constructor( private activatedRoute: ActivatedRoute, private spoonacular: SpoonacularService, private location: Location ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( params => {

      const { id } = params;

      this.spoonacular.getRecipe(id).subscribe( (recipe: RecipeDetails) => {
        this.recipe = recipe;
      })

    })
  }

  onReturn() {
    this.location.back();
  }

}
