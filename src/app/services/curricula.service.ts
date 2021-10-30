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
  public updateCurricula(top: TopicsForCurriculum): Observable<TopicsForCurriculum> {
    return this.http.patch<TopicsForCurriculum>(`${url}/${top.curriculumTopicKey.curr_id}&${top.curriculumTopicKey.topic_id}`, top)
      .pipe(catchError(e => this.handleError('update a topic date', e)));
  }
  constructor(private http: HttpClient, private router: Router) { }

  //get all Curricula topics in the join table
  public getAllTopicsForCurriculum(): Observable<TopicsForCurriculum[]> {
    return this.http.get<TopicsForCurriculum[]>(`${url}/curriculumTopic`);
  }
  public getCurriculumById(id: number): Observable<Curriculum> {
    return this.http.get<Curriculum>(`${url}/curriculum/findId/${id}`);
  }
  //get all Curriculum
  public getAllCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${url}/curriculum`);
  }

  private handleError(action: string, httpError: HttpErrorResponse) {
    return throwError(`Request to ${action} failed with ${httpError}, try again later.`);
  }
}
