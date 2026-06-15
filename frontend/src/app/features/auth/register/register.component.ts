import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-slate-50 font-sans antialiased">
      <div class="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-200/60">
        
        <!-- Identidad Visual -->
        <div class="text-center">
          <div class="mx-auto h-12 w-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center border border-indigo-100/40">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
          </div>
          <h2 class="mt-5 text-2xl font-extrabold text-slate-900 tracking-tight">
            Registrar nueva cuenta
          </h2>
          <p class="mt-2 text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
            Completa el formulario institucional para comenzar a compartir material de estudio.
          </p>
        </div>

        <!-- Alerta de Errores de la API -->
        @if (errorMessage()) {
          <div class="bg-rose-50 border border-rose-100 p-4 rounded-xl flex items-start gap-3">
            <svg class="h-5 w-5 text-rose-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <div>
              <p class="text-xs font-semibold text-rose-800">Error de validación</p>
              <p class="text-[11px] text-rose-600 mt-0.5 leading-relaxed">{{ errorMessage() }}</p>
            </div>
          </div>
        }

        <!-- Formulario Reactivo de Registro -->
        <form class="mt-8 space-y-5" [formGroup]="registerForm" (ngSubmit)="onSubmit()">
          
          <div class="space-y-4">
            <!-- Campo Nombre Completo -->
            <div>
              <label for="fullName" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Nombre y Apellido
              </label>
              <input
                id="fullName"
                type="text"
                formControlName="fullName"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Ej. Juan Pérez"
                [class.border-rose-300]="isFieldInvalid('fullName')"
              />
              @if (isFieldInvalid('fullName')) {
                <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                  El nombre completo es requerido (mínimo 2 caracteres).
                </p>
              }
            </div>

            <!-- Campo Email -->
            <div>
              <label for="email" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Correo Institucional
              </label>
              <input
                id="email"
                type="email"
                formControlName="email"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="ejemplo@upc.edu.ar"
                [class.border-rose-300]="isFieldInvalid('email')"
              />
              @if (isFieldInvalid('email')) {
                <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                  Debe ingresar un correo con formato válido.
                </p>
              }
            </div>

            <!-- Campo Contraseña -->
            <div>
              <label for="password" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                formControlName="password"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Mínimo 6 caracteres"
                [class.border-rose-300]="isFieldInvalid('password')"
              />
              @if (isFieldInvalid('password')) {
                <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                  La contraseña debe poseer al menos 6 caracteres.
                </p>
              }
            </div>

            <!-- Campo Confirmar Contraseña -->
            <div>
              <label for="confirmPassword" class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                Confirmar Contraseña
              </label>
              <input
                id="confirmPassword"
                type="password"
                formControlName="confirmPassword"
                class="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl placeholder-slate-400 text-slate-900 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none transition-all"
                placeholder="Repite tu contraseña"
                [class.border-rose-300]="isFieldInvalid('confirmPassword') || registerForm.hasError('mismatch')"
              />
              @if (registerForm.hasError('mismatch') && registerForm.get('confirmPassword')?.touched) {
                <p class="mt-1.5 text-[11px] text-rose-500 font-medium">
                  Las contraseñas ingresadas no coinciden.
                </p>
              }
            </div>
          </div>

          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid || isLoading()"
              class="w-full py-3.5 px-4 border border-transparent text-xs font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed shadow-md shadow-indigo-100 flex items-center justify-center gap-2">
              @if (isLoading()) {
                <svg class="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creando tu cuenta...
              } @else {
                Completar Registro
              }
            </button>
          </div>
        </form>

        <div class="text-center pt-2">
          <p class="text-xs text-slate-500">
            ¿Ya tienes cuenta? 
            <a routerLink="/auth/login" class="font-bold text-indigo-600 hover:text-indigo-500 transition-colors underline underline-offset-4">
              Inicia sesión aquí
            </a>
          </p>
        </div>

      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  readonly isLoading = signal<boolean>(false);
  readonly errorMessage = signal<string | null>(null);

  readonly registerForm: FormGroup = this.fb.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', [Validators.required]]
  }, { validators: this.passwordMatchValidator });

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading.set(true);
    this.errorMessage.set(null);

    const { fullName, email, password } = this.registerForm.value;

    this.authService.register(fullName, email, password).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set(err.error?.message || 'Error durante el registro de cuenta.');
      }
    });
  }

  isFieldInvalid(field: string): boolean {
    const control = this.registerForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}