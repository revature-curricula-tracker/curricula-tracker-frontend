import { Technology } from './../model/technology';
import { Injectable } from '@angular/core';
import { backendUrl } from './../../environments/environment';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Router } from '@angular/router';
const url = `${backendUrl}/technologies`;


@Injectable({
  providedIn: 'root'
})
export class TechnologyService {

  constructor(private http: HttpClient, private router: Router) { }

  public getAllTechnologies(): Observable<Technology[]> {
    return this.http.get<Technology[]>(`${url}/`);
  }
}
