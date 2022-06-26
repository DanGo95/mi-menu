import { Component, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, map, filter, debounceTime, distinctUntilChanged } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search = false;
  token: boolean;

  @ViewChild('searchInput', {static: true}) searchInput!: ElementRef;

  constructor( private auth: AuthService,private router: Router ) { 
    this.token = this.auth.isAuthenticated();
  }

  ngOnInit(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      /* get value */
      map((event: any) => {
        return event.target.value;
      }),
      filter((res: any) => res.length > 2),
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe((text: string) => {
      this.router.navigate(['/search', text])
    })    
  }

  showSearch() {
    this.search = !this.search;
    setTimeout(() => {
      this.searchInput.nativeElement.focus();
    }, 0);
  }

  logout() {
    this.auth.logout();
  }

}
