import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';

  constructor(private http: HttpClient) {}  // ✅ Keep constructor injection

  register(userId: string, password: string, role: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { userId, password, role });
  }

  // ✅ Login API Call
  login(userId: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { userId, password });
  }

  // ✅ Logout Function
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // ✅ Get Auth Token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ✅ Check if User is Authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
