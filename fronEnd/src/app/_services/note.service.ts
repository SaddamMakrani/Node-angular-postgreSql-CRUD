import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Note } from "../models/note.model";

const baseUrl = 'http://localhost:8080/api/notes';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient) { }

  getAll(userId: number): Observable<Note[]> {
    return this.http.get<Note[]>(baseUrl + `?userId=${userId}`);
  }

  get(id: any, userId: number): Observable<Note> {
    return this.http.get(`${baseUrl}/${id}/${userId}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(userId: number): Observable<any> {
    return this.http.delete(`${baseUrl}/all/${userId}`);
  }

  findByTitle(title: any, userId: number): Observable<Note[]> {
    return this.http.get<Note[]>(`${baseUrl}?title=${title}&userId=${userId}`);
  }
}
