import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { Recipe } from '../interfaces/recipe';
import { RecipeDetails } from '../interfaces/recipe-details';

@Injectable({
  providedIn: 'root'
})
export class SpoonacularService {

  private url: string = 'https://api.spoonacular.com/recipes';
  public offset = 0;
  /* previene múltiples llamadas a la API */
  public loading = false;
  
  private query!: string;

  constructor( private http: HttpClient) { }

  get params() {
    return {
      apiKey: 'fed0263ef8dc4c3f863e6b6dd258e8c2',
      query: this.query,
      addRecipeInformation: true,
      offset: this.offset
    }
  }

  resetPage() {
    this.offset = 0;
  }

  getRecipes(query: string): Observable<Recipe[]> {

    if (this.loading) {
      return of([]);
    }

    this.loading = true;
    this.query = query;
    return this.http.get<Recipe>(`${this.url}/complexSearch`, { params: this.params })
      .pipe(
        map( (recipes: any) => {
          return recipes.results
        }),
        tap( () => {
          this.offset += 10;
          this.loading = false;
        })
      )
  }

  getRecipe( id: number ) {
    return this.http.get<RecipeDetails>(`${this.url}/${id}/information`, { params: this.params })
  }
}
