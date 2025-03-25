import { Routes, provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';  // ✅ Import RouterModule
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

// ✅ Routes Setup
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // 🔥 Redirect to login first
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', redirectTo: 'login' }  // ✅ Catch-all route
];

// ✅ Provide necessary modules for Standalone App
export const appProviders = [
  provideRouter(routes),
  importProvidersFrom(FormsModule, RouterModule),  // ✅ Provide RouterModule globally
  UserService,
  AuthService
];
