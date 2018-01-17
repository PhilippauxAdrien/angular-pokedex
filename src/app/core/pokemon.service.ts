import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PokemonService {
	
	private endPoint = 'pokemon';  // URL to web api pokemon
	private endPointSpecies = 'pokemon-species'; 


 	constructor(
 		private http: HttpClient,
	) { }

 	/** GET pokemons from the server */
  	getAllPokemons (): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${this.endPoint}?limit=151&offset=0`)
      .pipe(
        tap(pokemons => console.log(`fetched pokemons`)),
        catchError(this.handleError('getAllPokemons', []))
      );
    }

    /** GET pokemon by id from the server */
  	getPokemon (id: number): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${this.endPoint}/${id}`)
      .pipe(
        tap(pokemon => console.log(`fetched pokemon id=${id}`)),
        catchError(this.handleError('getPokemon id=${id}', []))
      );
    }

    getSpecies(id: number): Observable<any>{
    	return this.http.get(`${environment.baseUrl}/${this.endPointSpecies}/${id}`)
    	.pipe(tap(species => console.log("species for id=${id}" )),
        catchError(this.handleError('getPokemon id=${id}', []))
        );
    }

	 /**
	   * Handle Http operation that failed.
	   * Let the app continue.
	   * @param operation - name of the operation that failed
	   * @param result - optional value to return as the observable result
	   */
	  private handleError<T> (operation = 'operation', result?: T) {
	    return (error: any): Observable<T> => {

	      // TODO: send the error to remote logging infrastructure
	      console.error(error); // log to console instead

	      // TODO: better job of transforming error for user consumption
	      console.log(`${operation} failed: ${error.message}`);

	      // Let the app keep running by returning an empty result.
	      return of(result as T);
	    };
	}
}
