import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);
  readonly tokenValid = signal<boolean>(true);

  private token: string | null = null;

  readonly resetForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  ngOnInit(): void {
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.token) {
      this.tokenValid.set(false);
      this.errorMessage.set('No se encontró un token de recuperación válido en la URL.');
    }
  }

  passwordMatchValidator(g: FormGroup) {
    const password = g.get('password')?.value;
    const confirm = g.get('confirmPassword')?.value;
    if (password && confirm && password !== confirm) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.resetForm.invalid || !this.token) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { password } = this.resetForm.value;

    this.http.post<any>('/api/auth/reset-password', {
      token: this.token,
      password
    }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message);

        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 3000);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        const msg = err.error?.message || 'Error al restablecer la contraseña.';
        this.errorMessage.set(msg);
        if (msg.toLowerCase().includes('inválido') || msg.toLowerCase().includes('expirado')) {
          this.tokenValid.set(false);
        }
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.resetForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}