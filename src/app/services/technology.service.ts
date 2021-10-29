import { Injectable } from '@angular/core';
import { Technology } from '../model/technology';
import { backendUrl } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const url = `${backendUrl}/tech`;

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient) { }

  public getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${url}`)
      .pipe( catchError( e => this.handleError('get all technologies',e) ) );
  }

  public getTechnologyById(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${url}/${id}`)
      .pipe( catchError( e => this.handleError('get technology by id',e) ) );
  }

  public getTechnologyByName(name: string): Observable<Technology> {
    return this.http.get<Technology>(`${url}/search/${name}`)
    .pipe( catchError( e => this.handleError('get technology by name',e) ) );
  }

  public addTechnology(tech: Technology): Observable<Technology> {
    return this.http.post<Technology>(`${url}/add`,tech)
    .pipe( catchError( e => this.handleError('add a technology',e) ) );
  }

  public updateTechnology(tech: Technology): Observable<Technology> {
    return this.http.patch<Technology>(`${url}/${tech.techId}`,tech)
    .pipe( catchError( e => this.handleError('update a technology',e) ) );
  }

  public deleteTechnology(tech: Technology): Observable<Boolean> {
    return this.http.delete<Boolean>(`${url}/${tech.techId}`)
    .pipe( catchError( e => this.handleError('delete a technology',e) ) );
  }

  private handleError(action:string, httpError: HttpErrorResponse) {
    return throwError(`Request to ${action} failed with ${httpError}, try again later.`)
  }

}
