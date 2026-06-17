import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex flex-col font-sans antialiased">
      <!-- HERO -->
      <header class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 py-10">
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
              Contacto
            </span>
            <a routerLink="/"
              class="text-xs text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 underline underline-offset-4 decoration-indigo-500">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
              </svg>
              Volver al Repositorio
            </a>
          </div>
          <div class="mt-8 text-center">
            <h1 class="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
              Contacto
            </h1>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              ¿Tenés dudas, sugerencias o querés colaborar? Estamos acá para escucharte.
            </p>
          </div>
        </div>
      </header>

      <section class="py-16 px-6 flex-1">
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- FORMULARIO -->
          <div>
            <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Escribinos</span>
            <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              Enviá tu <span class="text-indigo-500">mensaje</span>
            </h2>
            <p class="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
              Completá el formulario y te responderemos a la brevedad.
            </p>

            <form class="mt-8 space-y-5" [formGroup]="contactForm" (ngSubmit)="onSubmit()">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Nombre</label>
                  <input type="text" formControlName="name"
                    class="w-full px-4 py-3 bg-[var(--bg-deep)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[var(--text-muted)]"
                    placeholder="Tu nombre">
                </div>
                <div>
                  <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Email</label>
                  <input type="email" formControlName="email"
                    class="w-full px-4 py-3 bg-[var(--bg-deep)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[var(--text-muted)]"
                    placeholder="correo@ejemplo.com">
                </div>
              </div>
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Asunto</label>
                <input type="text" formControlName="subject"
                  class="w-full px-4 py-3 bg-[var(--bg-deep)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[var(--text-muted)]"
                  placeholder="¿Sobre qué querés hablar?">
              </div>
              <div>
                <label class="block text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-2">Mensaje</label>
                <textarea formControlName="message" rows="5"
                  class="w-full px-4 py-3 bg-[var(--bg-deep)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[var(--text-muted)] resize-none"
                  placeholder="Escribí tu mensaje acá..."></textarea>
              </div>

              @if (formSubmitted()) {
                <div class="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-sm font-semibold flex items-center gap-3">
                  <svg class="w-5 h-5 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  Mensaje enviado correctamente. Te responderemos pronto.
                </div>
              }

              <button type="submit" [disabled]="contactForm.invalid"
                class="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800/60 disabled:text-white text-white text-sm font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"></path>
                </svg>
                Enviar mensaje
              </button>
            </form>
          </div>

          <!-- INFO DE CONTACTO -->
          <div class="space-y-8">
            <div>
              <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Información</span>
              <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              Otras vías de <span class="text-indigo-500">contacto</span>
              </h2>
            </div>

            <div class="space-y-5">
              <div class="flex items-start gap-4 bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-[var(--text-primary)] text-sm">Email</h4>
                  <p class="text-sm text-[var(--text-secondary)] mt-1">contacto@upc-share.edu.ar</p>
                  <p class="text-xs text-[var(--text-muted)] mt-0.5">Respondemos en 24 a 48 hs hábiles</p>
                </div>
              </div>

              <div class="flex items-start gap-4 bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-[var(--text-primary)] text-sm">Ubicación</h4>
                  <p class="text-sm text-[var(--text-secondary)] mt-1">Universidad Provincial de Córdoba</p>
                  <p class="text-xs text-[var(--text-muted)] mt-0.5">Av. Richieri 2185, Córdoba, Argentina</p>
                </div>
              </div>

              <div class="flex items-start gap-4 bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-[var(--text-primary)] text-sm">Redes Sociales</h4>
                  <div class="flex gap-3 mt-2">
                    <span class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center hover:bg-indigo-500/20 transition-colors cursor-pointer">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </span>
                    <span class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center hover:bg-indigo-500/20 transition-colors cursor-pointer">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    </span>
                    <span class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center hover:bg-indigo-500/20 transition-colors cursor-pointer">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>
                    </span>
                    <span class="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center hover:bg-indigo-500/20 transition-colors cursor-pointer">
                      <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- HORARIOS -->
            <div class="bg-gradient-to-br from-indigo-500/5 via-indigo-500/5 to-transparent rounded-2xl p-6 border border-[var(--border-light)] shadow-sm relative overflow-hidden">
              <h4 class="font-bold text-[var(--text-primary)] text-sm flex items-center gap-2">
                <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Horarios de atención
              </h4>
              <div class="mt-4 space-y-2 text-sm text-[var(--text-secondary)]">
                <div class="flex justify-between">
                  <span>Lunes a Viernes</span>
                  <span class="font-semibold text-[var(--text-primary)]">09:00 - 18:00 hs</span>
                </div>
                <div class="flex justify-between">
                  <span>Sábados</span>
                  <span class="font-semibold text-[var(--text-primary)]">10:00 - 13:00 hs</span>
                </div>
                <div class="flex justify-between text-[var(--text-muted)]">
                  <span>Domingos</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="bg-[var(--bg-card)] border-t border-[var(--border-light)] py-8 text-center text-[11px] text-[var(--text-muted)] font-medium tracking-wide">
        <p>© 2026 UPC-Share. Repositorio institucional colaborativo para la Universidad Provincial de Córdoba.</p>
        <div class="flex justify-center gap-4 sm:gap-6 mt-3 flex-wrap">
          <a routerLink="/" class="hover:text-indigo-500 transition-colors">Inicio</a>
          <span class="text-[var(--border-light)]">·</span>
          <a routerLink="/about" class="hover:text-indigo-500 transition-colors">Sobre Nosotros</a>
          <span class="text-[var(--border-light)]">·</span>
          <a routerLink="/services" class="hover:text-indigo-500 transition-colors">Servicios</a>
        </div>
      </footer>
    </div>
  `
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  readonly formSubmitted = signal(false);

  contactForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    message: ['', Validators.required]
  });

  onSubmit(): void {
    if (this.contactForm.invalid) return;
    this.formSubmitted.set(true);
    this.contactForm.reset();
    setTimeout(() => this.formSubmitted.set(false), 5000);
  }
}
