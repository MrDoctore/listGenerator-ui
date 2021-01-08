import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  apiUrl = 'http://localhost:8080/eventos';

  constructor(private httpClient: HttpClient){}

  listPeople(id: number){
    return this.httpClient.get(`${this.apiUrl}/${id}/pessoas`);
  }

  add(id: number, person:any){
    return this.httpClient.post(`${this.apiUrl}/${id}/pessoas`, person);
  }

  update(id: number, person:any){
    return this.httpClient.put(`${this.apiUrl}/${id}/pessoas`, person);
  }

  delete(id: number, idp: number): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}/pessoas/${idp}`);
  }

  uploadList(id: number, formData: FormData){
    return this.httpClient.post(`${this.apiUrl}/${id}/pessoas/uploadLista`, formData, {
      observe: 'events',
      reportProgress: true
    });
  }

  importList(id: number, people:any){
    return this.httpClient.post(`${this.apiUrl}/${id}/pessoas/import`, people)
  }

}