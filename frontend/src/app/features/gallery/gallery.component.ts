import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col font-sans antialiased">
      <!-- HERO -->
      <header class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 py-10">
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
              Galería
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
              Galería de <span class="text-indigo-400">Recursos</span>
            </h1>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Explorá los tipos de materiales que podés encontrar y compartir en la plataforma.
            </p>
          </div>
        </div>
      </header>

      <!-- FILTROS VISUALES -->
      <section class="py-10 px-6 bg-[var(--bg-card)] border-b border-[var(--border-light)]">
        <div class="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center">
          <button class="bg-indigo-500/10 text-indigo-500 text-xs font-bold px-5 py-2.5 rounded-xl border border-indigo-500/20">Todos</button>
          <button class="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-xs font-bold px-5 py-2.5 rounded-xl border border-[var(--border-light)] hover:text-indigo-500 transition-colors">PDF</button>
          <button class="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-xs font-bold px-5 py-2.5 rounded-xl border border-[var(--border-light)] hover:text-indigo-500 transition-colors">Imágenes</button>
          <button class="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-xs font-bold px-5 py-2.5 rounded-xl border border-[var(--border-light)] hover:text-indigo-500 transition-colors">Word</button>
          <button class="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-xs font-bold px-5 py-2.5 rounded-xl border border-[var(--border-light)] hover:text-indigo-500 transition-colors">Presentaciones</button>
          <button class="bg-[var(--bg-deep)] text-[var(--text-secondary)] text-xs font-bold px-5 py-2.5 rounded-xl border border-[var(--border-light)] hover:text-indigo-500 transition-colors">Comprimidos</button>
        </div>
      </section>

      <!-- CUADRICULA -->
      <section class="py-12 px-6 flex-1">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (item of galleryItems; track item.title) {
              <div class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div class="h-44 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-900/50 flex items-center justify-center relative overflow-hidden">
                  <div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_50%_50%,_rgba(99,102,241,0.3),transparent_70%)]"></div>
                  @switch (item.icon) {
                    @case ('pdf') {
                      <svg class="w-16 h-16 text-rose-500/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                      </svg>
                    }
                    @case ('image') {
                      <svg class="w-16 h-16 text-sky-500/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"></path>
                      </svg>
                    }
                    @case ('word') {
                      <svg class="w-16 h-16 text-blue-500/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                      </svg>
                    }
                    @case ('slides') {
                      <svg class="w-16 h-16 text-amber-500/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605"></path>
                      </svg>
                    }
                    @case ('zip') {
                      <svg class="w-16 h-16 text-emerald-500/80" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"></path>
                      </svg>
                    }
                  }
                </div>
                <div class="p-5">
                  <div class="flex items-center gap-2 mb-2">
                    <span class="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                      [class]="item.badgeClass">{{ item.badge }}</span>
                    <span class="text-[10px] text-[var(--text-muted)]">{{ item.size }}</span>
                  </div>
                  <h3 class="font-bold text-[var(--text-primary)] text-sm">{{ item.title }}</h3>
                  <p class="text-xs text-[var(--text-tertiary)] mt-1.5 leading-relaxed">{{ item.desc }}</p>
                </div>
              </div>
            }
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
          <a routerLink="/auth/login" class="hover:text-indigo-500 transition-colors">Ingresar</a>
        </div>
      </footer>
    </div>
  `
})
export class GalleryComponent {
  galleryItems = [
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'bg-rose-500/10 text-rose-500',
      size: '2.4 MB',
      title: 'Resumen de Álgebra Lineal',
      desc: 'Guía completa con todos los temas del primer parcial. Incluye ejemplos resueltos paso a paso.'
    },
    {
      icon: 'image',
      badge: 'IMAGEN',
      badgeClass: 'bg-sky-500/10 text-sky-500',
      size: '1.8 MB',
      title: 'Diagrama de Base de Datos',
      desc: 'Infografía del modelo entidad-relación para la materia Base de Datos I.'
    },
    {
      icon: 'word',
      badge: 'WORD',
      badgeClass: 'bg-blue-500/10 text-blue-500',
      size: '3.2 MB',
      title: 'TP N°2 - Programación',
      desc: 'Trabajo práctico resuelto con explicación de cada ejercicio.'
    },
    {
      icon: 'slides',
      badge: 'PPT',
      badgeClass: 'bg-amber-500/10 text-amber-500',
      size: '5.7 MB',
      title: 'Slides de Física II',
      desc: 'Presentación completa con fórmulas, gráficos y ejercicios de ejemplo.'
    },
    {
      icon: 'zip',
      badge: 'ZIP',
      badgeClass: 'bg-emerald-500/10 text-emerald-500',
      size: '8.1 MB',
      title: 'Proyecto Integrador - Calculadora',
      desc: 'Código fuente completo del proyecto final de Laboratorio de Software.'
    },
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'bg-rose-500/10 text-rose-500',
      size: '1.2 MB',
      title: 'Guía de Estudio - Química',
      desc: 'Resumen de nomenclatura química, tabla periódica y ejercicios prácticos.'
    },
    {
      icon: 'image',
      badge: 'IMAGEN',
      badgeClass: 'bg-sky-500/10 text-sky-500',
      size: '0.9 MB',
      title: 'Mapa Conceptual - Redes',
      desc: 'Esquema visual de topologías de red, protocolos y modelos OSI/TCP/IP.'
    },
    {
      icon: 'word',
      badge: 'WORD',
      badgeClass: 'bg-blue-500/10 text-blue-500',
      size: '4.5 MB',
      title: 'Monografía - Historia Argentina',
      desc: 'Análisis detallado del período 1810-1853 con fuentes bibliográficas.'
    },
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'bg-rose-500/10 text-rose-500',
      size: '6.3 MB',
      title: 'Parcial Resuelto - Matemática',
      desc: 'Primer parcial completo con todas las resoluciones detalladas.'
    }
  ];
}
