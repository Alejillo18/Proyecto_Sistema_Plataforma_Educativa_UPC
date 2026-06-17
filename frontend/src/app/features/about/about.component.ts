import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen flex flex-col font-sans antialiased">
      <!-- HERO HEADER -->
      <header class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white">
        <div class="max-w-6xl mx-auto px-6 py-10">
          <div class="flex justify-between items-center">
            <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
              Sobre Nosotros
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
              UPC<span class="text-indigo-400">-Share</span>
            </h1>
            <p class="text-slate-400 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
              Repositorio institucional colaborativo de la Universidad Provincial de Córdoba.
              Un espacio creado por y para estudiantes, donde el conocimiento se comparte libremente.
            </p>
          </div>
        </div>
      </header>

      <!-- SECCIÓN: QUIÉNES SOMOS -->
      <section class="py-20 px-6">
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Quiénes Somos</span>
              <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
                Impulsando el <span class="text-indigo-500">aprendizaje colaborativo</span>
              </h2>
              <p class="text-[var(--text-secondary)] mt-5 text-sm leading-relaxed">
                UPC-Share nace como un proyecto académico de la Facultad de Ingeniería de la Universidad Provincial de Córdoba, 
                con el objetivo de centralizar y democratizar el acceso a materiales de estudio entre estudiantes de todas las carreras.
              </p>
              <p class="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed">
                Creemos firmemente que la educación de calidad se construye entre todos. Por eso desarrollamos una plataforma 
                abierta donde cada estudiante puede compartir sus apuntes, parciales resueltos, guías de estudio y cualquier 
                recurso que ayude a sus compañeros en el camino académico.
              </p>
              <div class="mt-8 flex flex-wrap gap-4">
                <div class="flex items-center gap-3 bg-[var(--bg-card)] rounded-2xl px-5 py-4 border border-[var(--border-light)] shadow-sm flex-1 min-w-[140px]">
                  <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-black text-[var(--text-primary)]">+500</span>
                    <span class="text-[11px] text-[var(--text-muted)] font-semibold">Recursos compartidos</span>
                  </div>
                </div>
                <div class="flex items-center gap-3 bg-[var(--bg-card)] rounded-2xl px-5 py-4 border border-[var(--border-light)] shadow-sm flex-1 min-w-[140px]">
                  <div class="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <span class="block text-2xl font-black text-[var(--text-primary)]">+300</span>
                    <span class="text-[11px] text-[var(--text-muted)] font-semibold">Estudiantes activos</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent rounded-3xl p-8 border border-indigo-500/10 relative overflow-hidden">
              <div class="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500/10 rounded-full blur-3xl"></div>
              <div class="relative">
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                    <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path>
                      </svg>
                    </div>
                    <h4 class="font-bold text-[var(--text-primary)] text-sm">Calidad Garantizada</h4>
                    <p class="text-[11px] text-[var(--text-tertiary)] mt-1.5 leading-relaxed">Contenido verificado por la comunidad</p>
                  </div>
                  <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                    <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.012a4.115 4.115 0 01-1.07-2.585 4.5 4.5 0 00-8.987.328l-.248.809m6.93 12.355l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757"></path>
                      </svg>
                    </div>
                    <h4 class="font-bold text-[var(--text-primary)] text-sm">Fácil Acceso</h4>
                    <p class="text-[11px] text-[var(--text-tertiary)] mt-1.5 leading-relaxed">Organizado por carrera y materia</p>
                  </div>
                  <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                    <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"></path>
                      </svg>
                    </div>
                    <h4 class="font-bold text-[var(--text-primary)] text-sm">Multi-carrera</h4>
                    <p class="text-[11px] text-[var(--text-tertiary)] mt-1.5 leading-relaxed">Todas las facultades disponibles</p>
                  </div>
                  <div class="bg-[var(--bg-card)] rounded-2xl p-5 border border-[var(--border-light)] shadow-sm">
                    <div class="w-9 h-9 rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                      <svg class="w-4.5 h-4.5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"></path>
                      </svg>
                    </div>
                    <h4 class="font-bold text-[var(--text-primary)] text-sm">Colaborativo</h4>
                    <p class="text-[11px] text-[var(--text-tertiary)] mt-1.5 leading-relaxed">Subí y compartí tu conocimiento</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN: NUESTROS OBJETIVOS -->
      <section class="py-20 px-6 bg-[var(--bg-card)] border-y border-[var(--border-light)]">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Nuestros Objetivos</span>
            <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              ¿Por qué <span class="text-indigo-500">UPC-Share</span>?
            </h2>
            <p class="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed">
              Buscamos transformar la forma en que los estudiantes acceden al material de estudio,
              eliminando barreras y fomentando la colaboración entre pares.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-[var(--bg-deep)] rounded-2xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Democratizar el Conocimiento</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Garantizar que todos los estudiantes, independientemente de su turno o modalidad, 
                tengan acceso equitativo a materiales de estudio de calidad.
              </p>
            </div>

            <div class="bg-[var(--bg-deep)] rounded-2xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Fomentar la Colaboración</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Crear una comunidad activa donde los estudiantes sean protagonistas, compartiendo 
                sus apuntes y construyendo colectivamente el material de estudio.
              </p>
            </div>

            <div class="bg-[var(--bg-deep)] rounded-2xl p-8 border border-[var(--border-light)] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
              <div class="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-5">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path>
                </svg>
              </div>
              <h3 class="font-bold text-[var(--text-primary)] text-lg tracking-tight">Innovación Educativa</h3>
              <p class="text-[var(--text-tertiary)] text-sm mt-3 leading-relaxed">
                Aprovechar la tecnología para modernizar el acceso a recursos académicos, 
                usando herramientas modernas que faciliten la experiencia de aprendizaje.
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN: TECNOLOGÍAS -->
      <section class="py-20 px-6">
        <div class="max-w-6xl mx-auto text-center">
          <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Stack Tecnológico</span>
          <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
            Construido con <span class="text-indigo-500">tecnología moderna</span>
          </h2>
          <div class="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <div class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm hover:border-indigo-500/30 transition-all">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"></path>
                </svg>
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm">Angular 21</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Framework frontend</p>
            </div>
            <div class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm hover:border-indigo-500/30 transition-all">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path>
                </svg>
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm">Tailwind CSS 4</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Estilos utilitarios</p>
            </div>
            <div class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm hover:border-indigo-500/30 transition-all">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"></path>
                </svg>
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm">Node.js + Express</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Backend API REST</p>
            </div>
            <div class="bg-[var(--bg-card)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm hover:border-indigo-500/30 transition-all">
              <div class="w-10 h-10 mx-auto rounded-lg bg-indigo-500/10 text-indigo-500 flex items-center justify-center mb-3">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"></path>
                </svg>
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm">PostgreSQL + MongoDB</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Bases de datos</p>
            </div>
          </div>
        </div>
      </section>

      <!-- SECCIÓN: EQUIPO -->
      <section class="py-20 px-6 bg-[var(--bg-card)] border-y border-[var(--border-light)]">
        <div class="max-w-6xl mx-auto">
          <div class="text-center max-w-2xl mx-auto mb-16">
            <span class="text-indigo-500 text-xs font-bold tracking-widest uppercase">Nuestro Equipo</span>
            <h2 class="text-3xl font-extrabold text-[var(--text-primary)] mt-3 tracking-tight">
              Hecho por <span class="text-indigo-500">estudiantes</span>, para estudiantes
            </h2>
            <p class="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed">
              Este proyecto fue desarrollado como parte del curso de Desarrollo Web por un equipo 
              apasionado por la tecnología y la educación.
            </p>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-[var(--bg-deep)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm text-center hover:-translate-y-1 transition-all duration-300">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">
                RC
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm mt-4">Rocío Casas</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Frontend Developer</p>
            </div>
            <div class="bg-[var(--bg-deep)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm text-center hover:-translate-y-1 transition-all duration-300">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">
                PG
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm mt-4">Pablo González</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Backend Developer</p>
            </div>
            <div class="bg-[var(--bg-deep)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm text-center hover:-translate-y-1 transition-all duration-300">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">
                ML
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm mt-4">Martín López</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">Full Stack Developer</p>
            </div>
            <div class="bg-[var(--bg-deep)] rounded-2xl p-6 border border-[var(--border-light)] shadow-sm text-center hover:-translate-y-1 transition-all duration-300">
              <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center text-white text-xl font-black shadow-lg shadow-indigo-500/20">
                JM
              </div>
              <h4 class="font-bold text-[var(--text-primary)] text-sm mt-4">Joaquín Morales</h4>
              <p class="text-[11px] text-[var(--text-muted)] mt-1">UI/UX Designer</p>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="py-20 px-6">
        <div class="max-w-4xl mx-auto text-center bg-gradient-to-br from-indigo-500/10 via-indigo-500/5 to-transparent rounded-3xl p-12 border border-indigo-500/10">
          <h2 class="text-3xl font-extrabold text-[var(--text-primary)] tracking-tight">
            ¿Listo para <span class="text-indigo-500">compartir</span> tu conocimiento?
          </h2>
          <p class="text-[var(--text-secondary)] mt-4 text-sm leading-relaxed max-w-lg mx-auto">
            Unite a la comunidad UPC-Share y empezá a colaborar con tus compañeros. 
            Cada apunte que subís ayuda a cientos de estudiantes.
          </p>
          <a routerLink="/auth/register"
            class="inline-flex items-center gap-2 mt-8 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold px-8 py-4 rounded-xl transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/30 hover:-translate-y-0.5">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
            </svg>
            Crear mi cuenta
          </a>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="bg-[var(--bg-card)] border-t border-[var(--border-light)] py-8 text-center text-[11px] text-[var(--text-muted)] font-medium tracking-wide">
        <p>© 2026 UPC-Share. Repositorio institucional colaborativo para la Universidad Provincial de Córdoba.</p>
        <div class="flex justify-center gap-4 sm:gap-6 mt-3 flex-wrap">
          <a routerLink="/" class="hover:text-indigo-500 transition-colors">Inicio</a>
          <span class="text-[var(--border-light)]">·</span>
          <a routerLink="/auth/login" class="hover:text-indigo-500 transition-colors">Ingresar</a>
          <span class="text-[var(--border-light)]">·</span>
          <a routerLink="/auth/register" class="hover:text-indigo-500 transition-colors">Registrarse</a>
        </div>
      </footer>
    </div>
  `
})
export class AboutComponent {}
