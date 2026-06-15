import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans antialiased">
      <div class="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/60">
        
        <!-- Identidad Visual de la Marca -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100/40">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
            </svg>
          </div>
          <h2 class="mt-5 text-2xl font-extrabold text-slate-900 tracking-tight">
            Acceder al repositorio
          </h2>
          <p class="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Ingresa tus credenciales autorizadas para descargar y colaborar con apuntes institucionales.
          </p>
        </div>

        <!-- Mensaje de error de la API -->
        @if (errorMessage()) {
          <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-rose-800">No se pudo iniciar sesión</p>
              <p class="text-[11px] text-rose-600 mt-0.5 leading-relaxed">{{ errorMessage() }}</p>
            </div>
          </div>
        }

        <!-- Formulario Reactivo de Login -->
        <form class="mt-8 space-y-5" [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="space-y-4">
            <!-- Campo de Correo Electrónico -->
            <div>
              <label for="email" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Correo Institucional
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
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

            <!-- Campo de Contraseña -->
            <div>
              <label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="••••••••"
                [class.border-rose-300]="isFieldInvalid('password')"
                [class.focus:ring-rose-500\\/10]="isFieldInvalid('password')"
                [class.focus:border-rose-500]="isFieldInvalid('password')"
              />
              @if (isFieldInvalid('password')) {
                <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                  La contraseña es requerida para el acceso.
                </p>
              }
            </div>
          </div>

          <!-- Botón de Envío -->
          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || isLoading()"
              class="w-full py-3.5 px-4 border border-transparent text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-indigo-100 flex items-center justify-center gap-2">
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              } @else {
                Confirmar Ingreso
              }
            </button>
          </div>
        </form>

        <!-- Redirección -->
        <div class="text-center pt-2">
          <p class="text-xs text-slate-500">
            ¿No eres miembro? 
            <a routerLink="/auth/register" class="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline underline-offset-4">
              Crea tu cuenta aquí
            </a>
          </p>
        </div>

      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

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
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}