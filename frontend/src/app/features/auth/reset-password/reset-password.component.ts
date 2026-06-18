import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans antialiased">
      <div class="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/60">

        <!-- Identidad Visual -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100/40">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h2 class="mt-5 text-2xl font-extrabold text-slate-900 tracking-tight">
            Restablecer contraseña
          </h2>
          <p class="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Ingresa tu nueva contraseña para acceder nuevamente al repositorio.
          </p>
        </div>

        <!-- Mensaje de éxito -->
        @if (successMessage()) {
          <div class="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-emerald-800">Contraseña actualizada</p>
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

        <!-- Token inválido -->
        @if (!tokenValid()) {
          <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-rose-800">Enlace inválido</p>
              <p class="text-[11px] text-rose-600 mt-0.5 leading-relaxed">
                El enlace de recuperación no es válido o ha expirado. Solicita uno nuevo.
              </p>
            </div>
          </div>
        }

        <!-- Formulario -->
        @if (!successMessage() && tokenValid()) {
          <form class="mt-8 space-y-5" [formGroup]="resetForm" (ngSubmit)="onSubmit()">
            <div class="space-y-4">
              <!-- Nueva contraseña -->
              <div>
                <label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Nueva contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  formControlName="password"
                  class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Mínimo 6 caracteres"
                  [class.border-rose-300]="isFieldInvalid('password')"
                  [class.focus:ring-rose-500\\/10]="isFieldInvalid('password')"
                  [class.focus:border-rose-500]="isFieldInvalid('password')"
                />
                @if (isFieldInvalid('password')) {
                  <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                    La contraseña debe tener al menos 6 caracteres.
                  </p>
                }
              </div>

              <!-- Confirmar contraseña -->
              <div>
                <label for="confirmPassword" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  formControlName="confirmPassword"
                  class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Repite la contraseña"
                  [class.border-rose-300]="isFieldInvalid('confirmPassword') || resetForm.hasError('passwordMismatch')"
                  [class.focus:ring-rose-500\\/10]="isFieldInvalid('confirmPassword') || resetForm.hasError('passwordMismatch')"
                  [class.focus:border-rose-500]="isFieldInvalid('confirmPassword') || resetForm.hasError('passwordMismatch')"
                />
                @if (isFieldInvalid('confirmPassword')) {
                  <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                    Debes confirmar la contraseña.
                  </p>
                }
                @if (resetForm.hasError('passwordMismatch') && resetForm.get('confirmPassword')?.touched) {
                  <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                    Las contraseñas no coinciden.
                  </p>
                }
              </div>
            </div>

            <div>
              <button
                type="submit"
                [disabled]="resetForm.invalid || isLoading()"
                class="w-full py-3.5 px-4 border border-transparent text-xs font-bold rounded-xl text-white bg-emerald-600 hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-emerald-100 flex items-center justify-center gap-2">
                @if (isLoading()) {
                  <svg class="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Restableciendo...
                } @else {
                  Restablecer contraseña
                }
              </button>
            </div>
          </form>
        }

        <!-- Enlaces -->
        <div class="text-center pt-2 space-y-2">
          @if (successMessage()) {
            <p class="text-xs text-slate-500">
              <a routerLink="/auth/login" class="font-bold text-emerald-600 hover:text-emerald-500 transition-colors underline underline-offset-4">
                Iniciar sesión ahora
              </a>
            </p>
          }
          @if (!tokenValid()) {
            <p class="text-xs text-slate-500">
              <a routerLink="/auth/forgot-password" class="font-bold text-amber-600 hover:text-amber-500 transition-colors underline underline-offset-4">
                Solicitar nuevo enlace
              </a>
            </p>
          }
          <p class="text-xs text-slate-500">
            <a routerLink="/auth/login" class="font-bold text-slate-600 hover:text-slate-500 transition-colors underline underline-offset-4">
              Volver al inicio de sesión
            </a>
          </p>
        </div>

      </div>
    </div>
  `
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
    // Obtener token de la URL
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

        // Redirigir al login después de 3 segundos
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
