import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col font-sans antialiased">
      <!-- HERO -->
      <header class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 py-10">
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
              Servicios
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
              Funcionalidades
            </h1>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Todo lo que podés hacer en UPC-Share para potenciar tu experiencia académica.
            </p>
          </div>
        </div>
      </header>

      <!-- FUNCIONALIDADES PRINCIPALES -->
      <section class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Funcionalidades</span>
            <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              Todo lo que <span class="text-indigo-500">necesitás</span> para estudiar
            </h2>
            <p class="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed">
              Desde la carga de apuntes hasta la interacción con otros estudiantes, UPC-Share 
              ofrece herramientas diseñadas para facilitar tu vida académica.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- 1 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Subir Apuntes</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Compartí parciales, resúmenes, guías y cualquier material de estudio con la comunidad. 
                Soporte para PDF, imágenes, Word y ZIP.
              </p>
              <div class="mt-4 flex items-center gap-2 text-xs">
                <span class="bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-md">PDF</span>
                <span class="bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-md">IMG</span>
                <span class="bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-md">DOC</span>
                <span class="bg-indigo-500/10 text-indigo-500 font-bold px-2.5 py-1 rounded-md">ZIP</span>
              </div>
            </div>

            <!-- 2 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Descargar Recursos</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Accedé a miles de recursos educativos con un solo clic. Descargá directamente 
                cualquier archivo sin límites ni restricciones.
              </p>
            </div>

            <!-- 3 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Explorar por Carrera</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Navegá por carreras, años y materias para encontrar exactamente lo que buscás. 
                Filtrado inteligente y búsqueda rápida.
              </p>
            </div>

            <!-- 4 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Comentar y Opinar</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Interactuá con la comunidad a través de comentarios. Preguntá, respondé y 
                compartí tu opinión sobre cada material.
              </p>
            </div>

            <!-- 5 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Dar Me Gusta</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Valorá los apuntes más útiles con un like. Los materiales mejor calificados 
                ganan visibilidad dentro de la plataforma.
              </p>
            </div>

            <!-- 6 -->
            <div class="bg-[var(--bg-card)] rounded-2xl p-7 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Visualización Segura</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Visualizá PDFs e imágenes directamente desde el navegador sin descargar. 
                Vista previa rápida con paginación incluida.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- PLANES / TIPOS DE CUENTA -->
      <section class="py-20 px-6 bg-[var(--bg-card)] border-y border-[var(--border-light)]">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Acceso</span>
            <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              Tipos de <span class="text-indigo-500">cuenta</span>
            </h2>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div class="bg-[var(--bg-deep)] rounded-2xl p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl">GRATUITO</div>
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-xl tracking-tight">Estudiante</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Acceso completo a todas las funcionalidades básicas:
              </p>
              <ul class="mt-6 space-y-3">
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Descargar apuntes ilimitados
                </li>
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Subir tus propios materiales
                </li>
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Comentar y valorar contenido
                </li>
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Acceso a todas las carreras
                </li>
              </ul>
              <a routerLink="/auth/register" class="mt-8 block w-full text-center bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold py-3.5 rounded-xl transition-all">
                Crear cuenta gratuita
              </a>
            </div>
            <div class="bg-gradient-to-br from-indigo-500/5 via-indigo-500/5 to-transparent rounded-2xl p-8 border border-[var(--border-light)] shadow-sm relative overflow-hidden">
              <div class="absolute top-0 right-0 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-[10px] font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-2xl">PRÓXIMAMENTE</div>
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-xl tracking-tight">Colaborador Premium</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Beneficios exclusivos para colaboradores destacados:
              </p>
              <ul class="mt-6 space-y-3">
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Estadísticas de descargas
                </li>
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Subir archivos de hasta 50 MB
                </li>
                <li class="flex items-start gap-3 text-sm text-[var(--text-secondary)]">
                  <svg class="w-4 h-4 text-indigo-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                  </svg>
                  Insignia de colaborador destacado
                </li>
              </ul>
              <button disabled class="mt-8 block w-full text-center bg-slate-800/60 text-slate-400 text-sm font-bold py-3.5 rounded-xl cursor-not-allowed border-0">
                Próximamente
              </button>
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
          <a routerLink="/auth/login" class="hover:text-indigo-500 transition-colors">Ingresar</a>
        </div>
      </footer>
    </div>
  `
})
export class ServicesComponent {}
