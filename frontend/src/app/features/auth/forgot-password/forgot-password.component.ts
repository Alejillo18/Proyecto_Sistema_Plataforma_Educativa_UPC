import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans antialiased">
      <div class="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/60">

        <!-- Identidad Visual -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100/40">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
            </svg>
          </div>
          <h2 class="mt-5 text-2xl font-extrabold text-slate-900 tracking-tight">
            Recuperar contraseña
          </h2>
          <p class="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Ingresa tu correo institucional y te enviaremos un enlace para restablecer tu contraseña.
          </p>
        </div>

        <!-- Mensaje de éxito -->
        @if (successMessage()) {
          <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-emerald-800">Solicitud enviada</p>
              <p class="text-[11px] text-emerald-600 mt-0.5 leading-relaxed">{{ successMessage() }}</p>
            </div>
          </div>
        }

        <!-- Mensaje de error -->
        @if (errorMessage()) {
          <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-rose-800">Error</p>
              <p class="text-[11px] text-rose-600 mt-0.5 leading-relaxed">{{ errorMessage() }}</p>
            </div>
          </div>
        }

        <!-- Formulario -->
        @if (!successMessage()) {
          <form class="mt-8 space-y-5" [formGroup]="forgotForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <div>
                <label for="email" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Correo Institucional
                </label>
                <input
                  id="email"
                  type="email"
                  formControlName="email"
                  class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all"
                  placeholder="estudiante@upc.edu.ar"
                  [class.border-rose-300]="isFieldInvalid('email')"
                  [class.focus:ring-rose-500\\/10]="isFieldInvalid('email')"
                  [class.focus:border-rose-500]="isFieldInvalid('email')"
                />
                @if (isFieldInvalid('email')) {
                  <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                    Por favor, ingresa un correo con formato válido.
                  </p>
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="forgotForm.invalid || isLoading()"
                class="w-full py-3.5 px-4 border border-transparent text-xs font-bold rounded-xl text-white bg-amber-600 hover:bg-amber-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-amber-100 flex items-center justify-center gap-2">
                @if (isLoading()) {
                  <svg class="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Enviando...
                } @else {
                  Enviar enlace de recuperación
                }
              </button>
            </div>
          </form>
        }

        <!-- Enlaces -->
        <div class="text-center pt-2 space-y-2">
          <p class="text-xs text-slate-500">
            <a routerLink="/auth/login" class="font-bold text-amber-600 hover:text-amber-500 transition-colors underline underline-offset-4">
              Volver al inicio de sesión
            </a>
          </p>
          <p class="text-xs text-slate-500">
            ¿No tienes cuenta?
            <a routerLink="/auth/register" class="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline underline-offset-4">
              Regístrate aquí
            </a>
          </p>
        </div>

      </div>
    </div>
  `
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

        // En desarrollo, mostrar el token si viene en la respuesta
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
