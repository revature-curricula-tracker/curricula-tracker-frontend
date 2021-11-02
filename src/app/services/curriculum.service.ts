import { Observable, throwError } from 'rxjs';
import { Curriculum } from 'src/app/model/curriculum';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { backendUrl } from 'src/environments/environment';
import { catchError } from "rxjs/operators";

const url = backendUrl + "/curriculum";

@Injectable({
  providedIn: 'root'
})
export class CurriculumService {

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  public addCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    console.log(curriculum)
    return this.http.post<Curriculum>(`${url}/add`, curriculum, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public findAllCurricula(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  public findById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${url}/findId/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public findByName(name: string): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${url}/findName/${name}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public updateCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.post<Curriculum>(`${url}/update`, curriculum, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public deleteById(id: number): void {
    this.http.delete<Curriculum>(`${url}/deleteById/${id}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  // error handler logger helper
  private handleError(httpError: HttpErrorResponse) {
    if (httpError instanceof ErrorEvent) {
      console.log('And error occurred: ', httpError);
    }
    else {
      console.error(`
        Backend returned code ${httpError.status},
        body was: ${httpError.error}
      `)
    }
    return throwError('Something bad happened; please try again later');
  }
}