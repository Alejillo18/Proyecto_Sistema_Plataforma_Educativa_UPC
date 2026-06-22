import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);
  readonly successMessage = signal<string | null>(null);

  readonly forgotForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  onSubmit(): void {
    if (this.forgotForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);
    this.successMessage.set(null);

    const { email } = this.forgotForm.value;

    this.http.post<any>('/api/auth/forgot-password', { email }).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.successMessage.set(res.message);

        if (res.data?.resetToken) {
          console.log('🔑 Token de recuperación (desarrollo):', res.data.resetToken);
          console.log('🔗 Enlace:', res.data.resetUrl);
        }
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error al procesar la solicitud.');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.forgotForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}