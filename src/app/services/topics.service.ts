import { backendUrl } from './../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Topic } from '../model/topic';

const url = `${backendUrl}/topics`;
@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  constructor(private http: HttpClient, private router: Router) { }

  public findAll(): Observable<Topic[]> {
    return this.http.get<Topic[]>(`${url}`)
      .pipe(catchError(e => this.handleError("Find all topics ", e)));
  }
  public findById(id: number): Observable<Topic> {
    return this.http.get<Topic>(`${url}/${id}`)
      .pipe(catchError(e => this.handleError('Find topic by id', e)));
  }

  public findByName(name: string): Observable<Topic> {
    return this.http.get<Topic>(`${url}/search/${name}`)
      .pipe(catchError(e => this.handleError('Find by name', e)));
  }

  public addTopic(top: Topic): Observable<Topic> {
    let newTopic = {
      "name": top.name,
      "description": top.description,
      "technology": top.technology,
      "curriculum": top.curriculum,
      "topicDay": top.topicDay
    }
    return this.http.post<Topic>(`${url}/add`, newTopic)
    .pipe(catchError(e => this.handleError('add a topic', e)));
  }

  public updateTopic(top: Topic): Observable<Topic> {
    return this.http.put<Topic>(`${url}/${top.id}`, top)
    .pipe(catchError(e => this.handleError('update a top', e)));
  }

  public updateTopicByName(topic: Topic, name: string): Observable<ArrayBuffer> {
    return this.http.put<ArrayBuffer>(`${url}/byname/${name}`, {name: topic.name, description: topic.description})
      .pipe(catchError(e => this.handleError('update topic by name', e)));
  }

  public deleteTopic(top: Topic): Observable<boolean> {
    return this.http.delete<boolean>(`${url}/${top.id}`)
    .pipe(catchError(e => this.handleError('delete a topic', e)));
  }

  public deleteTopicByName(name: string): Observable<void> {
    return this.http.delete<void>(`${url}/byname/${name}`)
      .pipe(catchError(e => this.handleError('Delete by name', e)));
  }
  private handleError(action: string, httpError: HttpErrorResponse) {
    console.log("Something went wrong!");
    return throwError(`Request to ${action} failed with ${httpError}, try again later.`);
  }
}
