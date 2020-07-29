import { Movie } from "./../models/movie";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MoviesRecommenderService {
  apiUrl: string =
    "https://api.themoviedb.org/3/search/movie?api_key=097cb7a2d3815e12d3c42b0addcf2e2d";

  constructor(private httpClient: HttpClient) {}

  getMovieDetails(movie: string): Observable<number> {
    return this.httpClient.get<number>(
      `https://api.themoviedb.org/3/search/movie?api_key=097cb7a2d3815e12d3c42b0addcf2e2d&language=en-US&query=${movie}`
    );
  }

  getSimilarMovies(id: number) {
    return this.httpClient.get<Movie[]>(
      `https://api.themoviedb.org/3/movie/${id}/similar?api_key=097cb7a2d3815e12d3c42b0addcf2e2d&language=en-US&page=1`
    );
  }
}
