import { AsyncPipe, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NavigationEnd,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { MovieService } from '@nx-workshop/movies/data-access-movies';
import { distinctUntilChanged, filter, map } from 'rxjs';
import { SideDrawerComponent } from '@nx-workshop/shared/ui';

import {
  DarkModeToggleComponent,
  HamburgerButtonComponent,
  SearchBarComponent,
} from '@nx-workshop/shared/ui';

@Component({
  selector: 'app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  standalone: true,
  imports: [
    SideDrawerComponent,
    RouterLinkActive,
    RouterLink,
    FastSvgComponent,
    NgFor,
    HamburgerButtonComponent,
    SearchBarComponent,
    FormsModule,
    DarkModeToggleComponent,
    AsyncPipe,
  ],
})
export class AppShellComponent implements OnInit {
  sideDrawerOpen = false;

  private _searchValue = '';
  set searchValue(value: string) {
    this._searchValue = value;
    this.router.navigate(['search', value]);
  }
  get searchValue(): string {
    return this._searchValue;
  }
  readonly genres$ = this.movieService.getGenres();

  constructor(private movieService: MovieService, private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(
        filter((e) => e instanceof NavigationEnd && this.sideDrawerOpen),
        map((e) => (e as NavigationEnd).urlAfterRedirects),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.sideDrawerOpen = false;
      });
  }
}
