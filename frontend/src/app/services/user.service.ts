import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:5000/api/auth/user';

  constructor(private http: HttpClient) {}

  getUserDetails(userId: string): Observable<any> {
    const token = localStorage.getItem('token');
    console.log("token===============",token);

    const headers = { Authorization: `Bearer ${token}` };
    console.log("headers===============",headers);
    return this.http.get(`${this.apiUrl}/${userId}`, { headers });
  }
}
