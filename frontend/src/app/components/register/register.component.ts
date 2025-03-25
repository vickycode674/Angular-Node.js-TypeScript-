import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],  // ✅ Import FormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = {  // 🔥 Declare the `user` object
    userId: '',
    password: '',
    role: 'General User'  // Default role
  };

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('🔹 Register button clicked!', this.user);

    if (!this.user.userId || !this.user.password) {
      alert('⚠️ Please enter User ID and Password.');
      return;
    }

    this.authService.register(this.user.userId, this.user.password, this.user.role).subscribe({
      next: (response) => {
        localStorage.setItem('registered', 'true'); // 🔥 Mark user as registered
        alert('✅ Registration successful! Redirecting to login...');
        this.router.navigate(['/login']); // Auto-redirect after registration
      },
      error: (error) => {
        console.error('❌ Registration failed:', error);
        alert('❌ Registration failed. Try again.');
      }
    });
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}
