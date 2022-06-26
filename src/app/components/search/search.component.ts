import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, fromEvent, map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SpoonacularService } from '../../services/spoonacular.service';
import { Recipe } from '../../interfaces/recipe';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  public recipes: Recipe[] = [];
  public query: string = '';
  public showLoader = false;


  @HostListener('window:scroll', ['$event'])
  onScroll() {

    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if ( pos > max ) {
      if ( this.spoonacular.loading ) { return; }
      this.spoonacular.getRecipes(this.query).subscribe( recipes => {
        this.recipes.push(...recipes);
      })
    }

  }

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;

  constructor( private activatedRoute: ActivatedRoute, private spoonacular: SpoonacularService ) {
  }

  ngOnInit(): void {
    this.showLoader = true;
    this.activatedRoute.params.subscribe( (params: any) => {
      this.spoonacular.resetPage();
      this.query = params.text;
      this.spoonacular.getRecipes( this.query ).subscribe( recipes => {
        this.recipes = recipes;
        this.showLoader = false;
      })
    })
  }

  ngOnDestroy(): void {
    this.spoonacular.resetPage();
  }

}
