import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col font-sans antialiased">
      <!-- HERO -->
      <header class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 py-10">
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
              Blog
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
              Blog & <span class="text-indigo-400">Novedades</span>
            </h1>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Mantenete al día con las últimas actualizaciones, tips de estudio y novedades del proyecto.
            </p>
          </div>
        </div>
      </header>

      <!-- BÚSQUEDA -->
      <section class="py-8 px-6 bg-[var(--bg-card)] border-b border-[var(--border-light)]">
        <div class="max-w-2xl mx-auto relative">
          <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
          </svg>
          <input type="text" placeholder="Buscar artículos..."
            class="w-full pl-11 pr-4 py-3 bg-[var(--bg-deep)] border border-[var(--border-light)] rounded-xl text-sm text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-[var(--text-muted)]">
        </div>
      </section>

      <!-- ARTÍCULOS -->
      <section class="py-12 px-6 flex-1">
        <div class="max-w-6xl mx-auto">
          <!-- Artículo destacado -->
          <div class="bg-gradient-to-br from-indigo-500/5 via-indigo-500/5 to-transparent rounded-2xl p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden mb-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span class="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-3 py-1 rounded-full uppercase tracking-wider">Destacado</span>
                <h2 class="text-2xl font-extrabold text-[var(--text-primary)] mt-4 tracking-tight leading-snug">
                  UPC-Share supera los 500 recursos compartidos
                </h2>
                <p class="text-sm text-[var(--text-secondary)] mt-3 leading-relaxed">
                  La comunidad estudiantil sigue creciendo. Ya son más de 500 apuntes, parciales y guías 
                  compartidas por estudiantes de todas las carreras de la UPC.
                </p>
                <div class="flex items-center gap-4 mt-6 text-xs text-[var(--text-muted)]">
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    15 Jun 2026
                  </span>
                  <span class="flex items-center gap-1.5">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                    </svg>
                    Equipo UPC-Share
                  </span>
                </div>
              </div>
              <div class="bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-transparent rounded-2xl p-10 flex items-center justify-center h-48">
                <svg class="w-20 h-20 text-indigo-500/30" fill="none" stroke="currentColor" stroke-width="1" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Artículos en grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @for (post of blogPosts; track post.title) {
              <article class="bg-[var(--bg-card)] rounded-2xl border border-[var(--border-light)] shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div class="h-40 bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-slate-900/50 flex items-center justify-center">
                  <div [innerHTML]="post.icon" class="w-14 h-14 text-indigo-500/30"></div>
                </div>
                <div class="p-6">
                  <div class="flex items-center gap-2 mb-3">
                    <span class="text-[10px] font-bold px-2.5 py-1 rounded-md"
                      [class]="post.categoryClass">{{ post.category }}</span>
                    <span class="text-[10px] text-[var(--text-muted)]">{{ post.date }}</span>
                  </div>
                  <h3 class="font-bold text-[var(--text-primary)] text-base leading-snug group-hover:text-indigo-500 transition-colors">
                    {{ post.title }}
                  </h3>
                  <p class="text-xs text-[var(--text-tertiary)] mt-2 leading-relaxed line-clamp-2">
                    {{ post.excerpt }}
                  </p>
                  <div class="flex items-center justify-between mt-5 pt-4 border-t border-[var(--border-light)]">
                    <span class="text-[10px] text-[var(--text-muted)]">Por {{ post.author }}</span>
                    <span class="text-[10px] font-bold text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">Leer más →</span>
                  </div>
                </div>
              </article>
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
          <a routerLink="/services" class="hover:text-indigo-500 transition-colors">Servicios</a>
        </div>
      </footer>
    </div>
  `
})
export class BlogComponent {
  blogPosts = [
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>',
      category: 'Novedad',
      categoryClass: 'bg-indigo-500/10 text-indigo-500',
      date: '10 Jun 2026',
      title: 'Nuevo diseño de la plataforma',
      excerpt: 'Renovamos completamente la interfaz de UPC-Share con un diseño más moderno, oscuro por defecto y con mejor experiencia de usuario.',
      author: 'Equipo UPC-Share'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path></svg>',
      category: 'Tips',
      categoryClass: 'bg-emerald-500/10 text-emerald-500',
      date: '5 Jun 2026',
      title: 'Cómo estudiar con apuntes digitales',
      excerpt: 'Tips para aprovechar al máximo los recursos digitales: organización, técnicas de estudio y herramientas complementarias.',
      author: 'Rocío Casas'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>',
      category: 'Comunidad',
      categoryClass: 'bg-amber-500/10 text-amber-500',
      date: '1 Jun 2026',
      title: 'Estudiantes destacados de Mayo',
      excerpt: 'Conocé a los estudiantes que más compartieron durante mayo. Gracias por construir esta comunidad.',
      author: 'Pablo González'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>',
      category: 'Actualización',
      categoryClass: 'bg-purple-500/10 text-purple-500',
      date: '28 May 2026',
      title: 'Nuevo sistema de comentarios',
      excerpt: 'Implementamos un sistema de comentarios mejorado con MongoDB para una experiencia más rápida y fluida.',
      author: 'Martín López'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path></svg>',
      category: 'Novedad',
      categoryClass: 'bg-indigo-500/10 text-indigo-500',
      date: '20 May 2026',
      title: 'Foro de discusión por materia',
      excerpt: 'Ahora podés debatir y resolver dudas en foros dedicados por cada materia académica.',
      author: 'Joaquín Morales'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path></svg>',
      category: 'Tips',
      categoryClass: 'bg-emerald-500/10 text-emerald-500',
      date: '15 May 2026',
      title: 'Organizá tu cuatrimestre con UPC-Share',
      excerpt: 'Guía para organizar tus materias, seguimiento de recursos y planificación de estudio.',
      author: 'Rocío Casas'
    }
  ];
}
