import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'http://challenge-react.alkemy.org/';

  constructor(private http: HttpClient, private router: Router) {}

  login( email: string, password: string ) {
    return this.http.post(this.url, {email, password});
  }

  logout() {
    localStorage.removeItem('id_token');
    this.router.navigateByUrl('/login');
  }

  setSession(token: string) {
    localStorage.setItem('id_token', token);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('id_token')) {
      return true;
    } else {
      return false;
    }
    
  }

}
