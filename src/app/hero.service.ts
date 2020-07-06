import { Injectable } from '@angular/core';
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Hero } from "./hero";

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  BASE_URL: string = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(`${this.BASE_URL}/heroes`, hero)
      .pipe(
        catchError(this.handleError<any>('addHero'))
      );
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.BASE_URL}/heroes`)
      .pipe(
        catchError(this.handleError<Hero[]>('getHeroes', []))
      );
  }

  getHero(id: number): Observable<Hero> {
    return this.http.get<Hero>(`${this.BASE_URL}/heroes/${id}`)
      .pipe(
        catchError(this.handleError<Hero>('getHero'))
      );
  }

  updateHero(hero: Hero): Observable<Hero>{
    return this.http.put<Hero>(`${this.BASE_URL}/heroes/${hero.id}`, hero);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
