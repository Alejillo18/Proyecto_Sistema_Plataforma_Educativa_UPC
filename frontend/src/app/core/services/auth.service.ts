import { Injectable, inject, signal, computed, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

export interface User {
  id: string;
  email: string;
  fullName: string;
  role: 'PROFESOR' | 'ESTUDIANTE';
  createdAt: string;
  careers?: Array<{ id: string; name: string }>;
}

export interface AuthResponse {
  status: string;
  message?: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ProfileResponse {
  status: string;
  data: {
    user: User;
  };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private platformId = inject(PLATFORM_ID);

  readonly currentUser = signal<User | null>(this.getStoredUser());

  readonly isAuthenticated = computed(() => this.currentUser() !== null);

  register(fullName: string, email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/register', { fullName, email, password })
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>('/api/auth/login', { email, password })
      .pipe(tap((response) => this.handleAuthentication(response)));
  }

  fetchProfile(): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>('/api/auth/profile').pipe(
      tap({
        next: (response) => {
          this.currentUser.set(response.data.user);
          if (isPlatformBrowser(this.platformId)) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        },
        error: () => this.logout(),
      }),
    );
  }

  logout(): void {
    this.currentUser.set(null);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }
    return localStorage.getItem('token');
  }

  private handleAuthentication(response: AuthResponse): void {
    const { user, token } = response.data;

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }

    this.currentUser.set(user);
  }

  private getStoredUser(): User | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    const stored = localStorage.getItem('user');
    if (!stored) return null;
    try {
      return JSON.parse(stored) as User;
    } catch {
      return null;
    }
  }
}
