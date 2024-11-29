import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FastSvgComponent } from '@push-based/ngx-fast-svg';
import { MovieService } from '@nx-workshop/movies/data-access-movies';
import { Observable } from 'rxjs';
import {
  TMDBMovieDetailsModel,
} from '@nx-workshop/shared/models';
import { StarRatingComponent } from '@nx-workshop/shared/ui-star-rating';
import { MovieImagePipe } from '@nx-workshop/shared/utils';

import { DetailGridComponent } from '@nx-workshop/shared/ui';
import { MovieListComponent } from '@nx-workshop/movies/ui-movie-list';

@Component({
  selector: 'movie-detail-page',
  templateUrl: './movie-detail-page.component.html',
  styleUrls: ['./movie-detail-page.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    DetailGridComponent,
    StarRatingComponent,
    FastSvgComponent,
    MovieListComponent,
    MovieImagePipe,
  ],
})
export class MovieDetailPageComponent implements OnInit {
  movie$!: Observable<TMDBMovieDetailsModel>;

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private location: Location
  ) { }

  goBack() {
    this.location.back();
  };

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.movie$ = this.movieService.getMovieById(params['id']);
    });
  }
}
