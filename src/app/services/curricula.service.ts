import { Curriculum } from 'src/app/model/curriculum';
import { TopicsForCurriculum } from './../model/topicsForCurriculum';
import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

const url = `${backendUrl}`;

@Injectable({
  providedIn: 'root'
})
export class CurriculaService {


  constructor(private http: HttpClient, private router: Router) { }

  //get all Curricula topics in the join table
  public getAllTopicsForCurriculum(): Observable<TopicsForCurriculum[]> {
    return this.http.get<TopicsForCurriculum[]>(`${url}/curriculumTopic`);
  }
  public getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${url}/curriculum/findId/${id}`);
  }
  public updateCurricula(top: TopicsForCurriculum): Observable<TopicsForCurriculum> {
    console.log(top);
    return this.http.patch<TopicsForCurriculum>(`${url}/${top.curriculum.curriculumId}&${top.topic.id}`, top)
      .pipe(catchError(e => this.handleError('update a topic date', e)));
  }
  //get all Curriculum
  public getAllCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${url}/curriculum`);
  }

  private handleError(action: string, httpError: HttpErrorResponse) {
    return throwError(`Request to ${action} failed with ${httpError}, try again later.`);
  }
}
