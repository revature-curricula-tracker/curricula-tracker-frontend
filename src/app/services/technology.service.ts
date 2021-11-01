import { Technology } from './../model/technology';
import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

const url = `${backendUrl}/tech`;


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${url}`)
      .pipe(catchError(e => this.handleError('get all technologies', e)));
  }

  public getTechnologyById(id: number): Observable<Technology> {
    return this.http.get<Technology>(`${url}/${id}`)
      .pipe(catchError(e => this.handleError('get technology by id', e)));
  }

  public getTechnologyByName(name: string): Observable<Technology> {
    return this.http.get<Technology>(`${url}/search/${name}`)
      .pipe(catchError(e => this.handleError('get technology by name', e)));
  }

  public addTechnology(tech: Technology): Observable<Technology> {
    return this.http.post<Technology>(`${url}/add`, tech)
      .pipe(catchError(e => this.handleError('add a technology', e)));
  }

  public updateTechnology(tech: Technology): Observable<Technology> {
    return this.http.patch<Technology>(`${url}/${tech.techId}`, tech)
      .pipe(catchError(e => this.handleError('update a technology', e)));
  }

  public deleteTechnology(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${url}/${id}`)
      .pipe(catchError(e => this.handleError('delete a technology', e)));
  }

  private handleError(action: string, httpError: HttpErrorResponse) {
    return throwError(`Request to ${action} failed with ${httpError}, try again later.`)
  }

}
