import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SearchComponent } from './components/search/search.component';
import { HomeComponent } from './pages/home/home.component';
import { RecipeDetailsComponent } from './components/recipe-details/recipe-details.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [ AuthGuard ] },
  { path: 'search/:text', component: SearchComponent, canActivate: [ AuthGuard ] },
  { path: 'recipe/:id', component: RecipeDetailsComponent, canActivate: [ AuthGuard ] },
  { path: '**', pathMatch:'full', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
