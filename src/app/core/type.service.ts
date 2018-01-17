import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import {environment} from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TypeService {

  private endPoint = 'type';

  constructor(
 		private http: HttpClient,
	) { }

  	/** GET type by id from the server */
  	getType (name: string): Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/${this.endPoint}/${name}/`)
      .pipe(
        tap(type => console.log(`fetched type name=${name}`)),
        catchError(this.handleError(`type name=${name}`, []))
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
