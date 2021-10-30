import { Technology } from './../model/technology';
import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
const url = `${backendUrl}/tech`;


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${url}/`);
  }

  public createTechnology(tech:Technology): Observable<Technology> {
    return this.http.post<Technology>(`${url}/add`, tech);
  }

  public deleteTechnology(id: number): Observable<Technology> {
    console.log(`${url}/${id}`);
    return this.http.delete<Technology>(`${url}/${id}`);
  }

  public editTechnology(tech:Technology): Observable<Technology> {
    console.log(tech);
    return this.http.patch<Technology>(`${url}/${tech.techId}`, tech);
  }
}
