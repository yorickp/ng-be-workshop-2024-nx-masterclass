import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Movie } from '@ng-be-workshop/models';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'movies-app';
  movies!: Movie[];

  constructor(private http: HttpClient) {
    this.http.get('/api').subscribe((data) => (this.movies = data as Movie[]));
  }
}
