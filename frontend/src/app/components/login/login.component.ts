import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  userId: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    console.log('🔹 Login button clicked!');

    if (!this.userId || !this.password) {
      alert('⚠️ Please enter both User ID and Password.');
      return;
    }

    this.authService.login(this.userId, this.password).subscribe({
      next: (response) => {
        console.log('✅ API Response:', response);
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));

        if (response.user.role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        console.error('❌ Login failed:', error);
        alert('❌ Invalid credentials. Please try again.');
      }
    });
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
