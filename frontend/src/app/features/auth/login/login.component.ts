import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

type QuickRole = 'ESTUDIANTE' | 'PROFESOR';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly selectedRole = signal<QuickRole>('ESTUDIANTE');

  private readonly DEMO_CREDENTIALS: Record<QuickRole, { email: string; password: string }> = {
    ESTUDIANTE: { email: 'alumno@upc.edu', password: 'alumno123' },
    PROFESOR: { email: 'prof@upc.edu', password: 'prof123' },
  };

  readonly loginForm: FormGroup = this.fb.group({
    email: [this.DEMO_CREDENTIALS.ESTUDIANTE.email, [Validators.required, Validators.email]],
    password: [this.DEMO_CREDENTIALS.ESTUDIANTE.password, [Validators.required]],
  });

  selectRole(role: QuickRole): void {
    this.selectedRole.set(role);
    const creds = this.DEMO_CREDENTIALS[role];
    this.loginForm.patchValue({
      email: creds.email,
      password: creds.password,
    });
  }

  onSubmit(): void {
    if (this.loginForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { email, password } = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error en las credenciales proporcionadas.');
      },
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}
