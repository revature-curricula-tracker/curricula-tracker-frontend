import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Curriculum } from '../model/curriculum';
import { TopicsForCurriculum } from './../model/topicsForCurriculum';

const url = `${backendUrl}/curriculum`;

@Injectable({
  providedIn: 'root'
})
export class CurriculaService {
  updateCurricula() {
    throw new Error('Method not implemented.');
  }

  constructor(private http: HttpClient, private router: Router) { }

  public getAllCurricula(): Observable<Curriculum[]>{
    return this.http.get<Curriculum[]>(`${url}/`);
  }
  public deleteCurriculum(id: number): Observable<Curriculum>{
    return this.http.delete<Curriculum>(`${url}/${id}`);
  }
  public editCurriculum(curriculum: Curriculum): Observable<Curriculum> {
    return this.http.patch<Curriculum>(`${url}/${curriculum.curriculumId}`, curriculum);
  }
  public getCurriculumById(id:number): Observable<Curriculum>{
    return this.http.get<Curriculum>(`${url}/curriculum/findId/${id}`);
  }
  public getAllTopicsForCurriculum(): Observable<TopicsForCurriculum[]> {
    return this.http.get<TopicsForCurriculum[]>(`${url}/curriculumTopic`);
  }
}
