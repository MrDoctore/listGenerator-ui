import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  apiUrl = 'http://localhost:8080/eventos';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get(this.apiUrl);
  }

  add(event: any) {
    return this.httpClient.post(this.apiUrl, event);
  }

  update(event: any) {
    return this.httpClient.put(this.apiUrl, event);
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`);
  }
}
