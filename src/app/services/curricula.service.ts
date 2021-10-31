import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { Curriculum } from '../model/curriculum';

const url = `${backendUrl}/curriculum`;

@Injectable({
  providedIn: 'root'
})
export class CurriculaService {

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
}
