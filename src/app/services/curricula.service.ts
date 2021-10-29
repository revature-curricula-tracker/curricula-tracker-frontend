import { Curriculum } from 'src/app/model/curriculum';
import { TopicsForCurriculum } from './../model/topicsForCurriculum';
import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';

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
  public getCurriculumById(id:number): Observable<Curriculum>{
    return this.http.get<Curriculum>(`${url}/curriculum/findId/${id}`);
  }
  //get all Curriculum
  public getAllCurriculum(): Observable<Curriculum[]> {
    return this.http.get<Curriculum[]>(`${url}/curriculum`);
  }
}
