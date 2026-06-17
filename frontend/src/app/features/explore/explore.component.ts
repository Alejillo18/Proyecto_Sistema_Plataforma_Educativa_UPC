import { Component, OnInit, inject, signal, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

interface Career {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  yearOfCareer: number;
}

interface FileMetadata {
  _id: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  subjectId: string;
  userId: string;
  tags: string[];
  downloads: number;
  likes: string[];
  createdAt: string;
}

interface UserComment {
  _id: string;
  fileId: string;
  userId: string;
  userFullName: string;
  content: string;
  createdAt: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="min-h-screen bg-slate-50 flex flex-col justify-between font-sans antialiased text-slate-800">
      
      <!-- SECCIÓN DE CABECERA Y CONTROL DE BÚSQUEDA (Solo visible en vista explorador) -->
      @if (activeView() === 'explore') {
        <div class="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white py-14 px-6 shadow-sm border-b border-slate-800">
          <div class="max-w-6xl mx-auto">
            <div class="flex justify-between items-center">
              <div class="flex items-center gap-3">
                <span class="text-indigo-400 text-xs font-bold tracking-wider uppercase bg-indigo-950/80 px-3.5 py-1.5 rounded-full border border-indigo-900/50">
                  Repositorio Institucional
                </span>
              </div>

              <!-- Nav links - Desktop -->
              <div class="hidden lg:flex items-center gap-2">
                <a routerLink="/about"
                  class="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
                  </svg>
                  Nosotros
                </a>
                <a routerLink="/services"
                  class="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
                  </svg>
                  Servicios
                </a>
                <a routerLink="/gallery"
                  class="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"></path>
                  </svg>
                  Galería
                </a>
                <a routerLink="/blog"
                  class="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
                  </svg>
                  Blog
                </a>
                <a routerLink="/contact"
                  class="text-[10px] text-slate-400 hover:text-white transition-colors flex items-center gap-1 px-3 py-1.5 rounded-full border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
                  </svg>
                  Contacto
                </a>
                <!-- Auth indicator - Desktop -->
                <div class="text-xs text-slate-300 flex items-center gap-3 ml-3 pl-3 border-l border-slate-800/60">
                  @if (authService.isAuthenticated()) {
                    <span class="flex items-center gap-2">
                      <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span class="font-semibold text-white hidden xl:inline">{{ authService.currentUser()?.fullName }}</span>
                    </span>
                    <button 
                      (click)="authService.logout()" 
                      class="text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-indigo-500">
                      Cerrar
                    </button>
                  } @else {
                    <span class="text-slate-400">Invitado</span>
                  }
                </div>
              </div>

              <!-- Hamburger button - Mobile -->
              <button (click)="menuOpen.set(!menuOpen())"
                class="lg:hidden relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 transition-all"
                [attr.aria-label]="menuOpen() ? 'Cerrar menú' : 'Abrir menú'">
                <div class="w-4 h-3.5 relative flex flex-col justify-between">
                  <span class="block h-0.5 w-full bg-slate-400 rounded-full transition-all duration-300"
                    [class.rotate-45]="menuOpen()"
                    [class.translate-y-[6px]]="menuOpen()"></span>
                  <span class="block h-0.5 w-full bg-slate-400 rounded-full transition-all duration-300"
                    [class.opacity-0]="menuOpen()"></span>
                  <span class="block h-0.5 w-full bg-slate-400 rounded-full transition-all duration-300"
                    [class.-rotate-45]="menuOpen()"
                    [class.-translate-y-[6px]]="menuOpen()"></span>
                </div>
              </button>
            </div>

            <div class="mt-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h1 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-none">
                  Explora apuntes de la comunidad
                </h1>
                <p class="text-slate-400 mt-3 max-w-2xl text-sm leading-relaxed">
                  Busca tu carrera académica y accede de forma inmediata a parciales, guías de estudio prácticos y apuntes de alta calidad compartidos de forma colaborativa.
                </p>
              </div>
              
              @if (authService.isAuthenticated()) {
                <button 
                  (click)="openUploadModal()"
                  class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-5 py-3 rounded-xl shadow-md shadow-indigo-950/50 flex items-center gap-2 transition-all shrink-0 hover:-translate-y-0.5">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"></path>
                  </svg>
                  Subir Documento
                </button>
              }
            </div>

            <!-- Selector de Carreras -->
            <div class="mt-8 flex flex-wrap gap-2">
              @for (career of careers(); track career.id) {
                <button 
                  (click)="selectCareer(career.id)"
                  [class]="selectedCareerId() === career.id 
                    ? 'bg-white text-slate-900 font-semibold shadow-md' 
                    : 'bg-slate-800/60 hover:bg-slate-800/90 text-slate-300 border border-slate-700/50'"
                  class="px-4.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 flex items-center gap-2">
                  <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path>
                  </svg>
                  {{ career.name }}
                </button>
              } @empty {
                <p class="text-slate-500 text-xs py-2">Cargando carreras disponibles en el repositorio...</p>
              }
            </div>
          </div>
        </div>
      }

      <!-- VISTA 1: EXPLORADOR GENERAL -->
      @if (activeView() === 'explore') {
        <div class="max-w-6xl mx-auto w-full px-6 py-10 flex-1 grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <aside class="md:col-span-1">
            <div class="bg-white rounded-2xl p-5 border border-slate-200/60 shadow-xs sticky top-6">
              <h3 class="font-bold text-slate-900 text-xs tracking-wider uppercase mb-5 flex items-center gap-2">
                <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                </svg>
                Asignaturas
              </h3>

              @if (selectedCareerId()) {
                @for (year of [1, 2, 3, 4, 5]; track year) {
                  @if (hasSubjectsOfYear(year)) {
                    <div class="mb-5">
                      <span class="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2.5">
                        {{ year }}° Año Académico
                      </span>
                      <ul class="space-y-1">
                        @for (subj of getSubjectsOfYear(year); track subj.id) {
                          <li>
                            <button 
                              (click)="selectSubject(subj.id)"
                              [class]="selectedSubjectId() === subj.id 
                                ? 'bg-indigo-50/80 text-indigo-700 font-semibold' 
                                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'"
                              class="w-full text-left px-3.5 py-2.5 rounded-xl text-xs transition-all duration-150 flex items-center gap-2">
                              <span class="h-1.5 w-1.5 rounded-full" [class]="selectedSubjectId() === subj.id ? 'bg-indigo-600' : 'bg-slate-300'"></span>
                              {{ subj.name }}
                            </button>
                          </li>
                        }
                      </ul>
                    </div>
                  }
                }
              } @else {
                <div class="text-center py-12">
                  <svg class="w-8 h-8 text-slate-300 mx-auto mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a9 9 0 0118 0v1"></path>
                  </svg>
                  <p class="text-xs text-slate-400 leading-relaxed px-4">Selecciona una carrera académica arriba para ver sus materias correspondientes.</p>
                </div>
              }
            </div>
          </aside>

          <main class="md:col-span-3">
            @if (selectedSubjectId()) {
              <div class="flex justify-between items-center mb-6">
                <h2 class="text-sm font-bold text-slate-500 uppercase tracking-wider">
                  Documentos disponibles ({{ files().length }})
                </h2>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                @for (file of files(); track file._id) {
                  <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-xs hover:shadow-md hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between">
                    <div>
                      <div class="flex justify-between items-start mb-4">
                        <span class="bg-slate-100 text-slate-700 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-slate-200/40">
                          {{ getFileExtension(file.fileType) }}
                        </span>
                        <span class="text-[11px] font-semibold text-slate-400">
                          {{ formatBytes(file.fileSize) }}
                        </span>
                      </div>

                      <h3 
                        (click)="viewFileDetail(file)"
                        class="font-extrabold text-slate-900 text-base leading-snug tracking-tight hover:text-indigo-600 cursor-pointer transition-colors">
                        {{ file.title }}
                      </h3>
                      <p class="text-xs text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                        {{ file.description || 'Sin descripción adicional para este archivo.' }}
                      </p>

                      @if (file.tags.length > 0) {
                        <div class="flex flex-wrap gap-1 mt-4">
                          @for (tag of file.tags; track tag) {
                            <span class="bg-slate-50 text-slate-500 text-[10px] px-2 py-0.5 rounded-md border border-slate-200/30">
                              #{{ tag }}
                            </span>
                          }
                        </div>
                      }
                    </div>

                    <div class="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                      <div class="flex items-center gap-4">
                        <button 
                          (click)="toggleLike(file)"
                          [class.text-rose-600]="hasUserLiked(file)"
                          class="flex items-center gap-1.5 hover:text-rose-600 transition-colors group">
                          <svg class="w-4 h-4 group-hover:scale-110 transition-transform" [attr.fill]="hasUserLiked(file) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                          </svg>
                          <span class="font-bold">{{ file.likes.length }}</span>
                        </button>
                        
                        <span class="flex items-center gap-1.5">
                          <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                            <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                          </svg>
                          <span class="font-semibold">{{ file.downloads }}</span>
                        </span>

                        <button 
                          (click)="viewFileDetail(file)"
                          class="flex items-center gap-1.5 hover:text-indigo-600 transition-colors">
                          <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                          </svg>
                          <span class="font-semibold">Detalles</span>
                        </button>
                      </div>

                      <button 
                        (click)="download(file)"
                        class="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl transition-all shadow-xs group">
                        <svg class="w-4 h-4 group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                } @empty {
                  <div class="col-span-2 bg-white rounded-2xl p-14 text-center border border-slate-200/60 shadow-xs">
                    <svg class="w-12 h-12 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                    </svg>
                    <h4 class="font-bold text-slate-800 text-sm">No hay apuntes disponibles</h4>
                    <p class="text-xs text-slate-400 mt-1.5 max-w-sm mx-auto leading-relaxed">Aún no se han subido documentos de estudio para esta materia académica. ¡Sé el primero en colaborar!</p>
                  </div>
                }
              </div>
            } @else {
              <div class="bg-white rounded-2xl p-20 text-center border border-slate-200/60 shadow-xs flex flex-col items-center justify-center min-h-[380px]">
                <svg class="w-14 h-14 text-indigo-500/20 mb-5 animate-bounce" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
                </svg>
                <h3 class="font-extrabold text-slate-900 text-lg tracking-tight">Explora asignaturas de estudio</h3>
                <p class="text-xs text-slate-400 max-w-sm mt-2 leading-relaxed">
                  Selecciona una de las materias de la barra de navegación lateral para listar todos los apuntes cargados por la comunidad estudiantil.
                </p>
              </div>
            }
          </main>
        </div>
      }

      <!-- VISTA 2: PREVISUALIZACIÓN Y DETALLE COMPLETO DEL DOCUMENTO -->
      @if (activeView() === 'detail' && selectedFileForDetail()) {
        <div class="max-w-6xl mx-auto w-full px-6 py-8 flex-1 flex flex-col gap-6">
          
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-4 rounded-2xl border border-slate-200/60 shadow-3xs">
            <button 
              (click)="closeFileDetail()"
              class="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"></path>
              </svg>
              Volver al Explorador
            </button>
            
            <div class="flex items-center gap-2">
              @if (isFileOwner()) {
                @if (!isEditMode()) {
                  <button 
                    (click)="enableEditMode()"
                    class="bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-indigo-100">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path>
                    </svg>
                    Editar Apunte
                  </button>
                  <button 
                    (click)="deleteFile(selectedFileForDetail()!._id)"
                    class="bg-rose-50 hover:bg-rose-100/80 text-rose-700 text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5 border border-rose-100">
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-1.816A2.25 2.25 0 0013.81 2H10.19a2.25 2.25 0 00-2.25 2.25V4"></path>
                    </svg>
                    Eliminar
                  </button>
                } @else {
                  <button 
                    (click)="saveChanges()"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-1.5">
                    Guardar Cambios
                  </button>
                  <button 
                    (click)="disableEditMode()"
                    class="bg-white hover:bg-slate-50 text-slate-600 border border-slate-200 text-xs font-bold px-4 py-2 rounded-xl transition-all">
                    Cancelar
                  </button>
                }
              }
            </div>
          </div>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1 items-start">
            
            <!-- COLUMNA IZQUIERDA: PREVISUALIZADOR DEL ARCHIVO -->
            <div class="lg:col-span-2 space-y-6">
              
              <div class="bg-white rounded-2xl border border-slate-200/60 shadow-sm overflow-hidden flex flex-col h-[650px]">
                <div class="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                    </svg>
                    Previsualización Segura
                  </span>
                </div>
                
                <!-- VISUALIZADOR SEGURO DE ARCHIVOS (LECTOR DE IMÁGENES NATIVO SIN IFRAME/SERVICE WORKER BUGS) -->
                <div class="flex-1 bg-slate-100 relative h-full flex flex-col justify-between overflow-hidden">
                  @if (selectedFileForDetail()?.fileType?.includes('pdf')) {
                    <!-- LECTOR DE PÁGINAS MEDIANTE RENDERS DE ALTA DEFINICIÓN -->
                    <div class="flex-1 overflow-y-auto p-4 flex justify-center items-start bg-slate-800">
                      <img 
                        [src]="getPdfPageUrl(currentPdfPage())" 
                        (error)="onPdfPageError()"
                        class="max-w-full h-auto shadow-xl border border-slate-700/50 rounded-lg select-none"
                        alt="Página del documento de estudio"
                      />
                    </div>
                    
                    <!-- PANEL DE CONTROL DE PAGINACIÓN -->
                    <div class="p-3.5 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-xs text-white relative gap-2">
                      <!-- Toast de aviso para límites de página en memoria sin alerts -->
                      @if (showPageLimitWarning()) {
                        <div class="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 border border-slate-800 text-slate-300 px-4 py-2 rounded-full font-bold shadow-lg animate-bounce text-[10px]">
                          Fin del documento alcanzado
                        </div>
                      }

                      <button 
                        [disabled]="currentPdfPage() <= 1"
                        (click)="prevPdfPage()"
                        class="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 font-bold">
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"></path>
                        </svg>
                        Anterior
                      </button>
                      
                      <span class="font-extrabold text-slate-400 tracking-wider">PÁGINA {{ currentPdfPage() }}</span>
                      
                      <button 
                        [disabled]="pdfPageLimitReached()"
                        (click)="nextPdfPage()"
                        class="bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1 font-bold">
                        Siguiente
                        <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"></path>
                        </svg>
                      </button>
                    </div>
                  } @else if (selectedFileForDetail()?.fileType?.includes('image')) {
                    <!-- PREVISUALIZADOR EXCLUSIVO PARA IMÁGENES SUBIDAS -->
                    <div class="flex-1 overflow-y-auto p-4 flex justify-center items-center bg-slate-800">
                      <img 
                        [src]="getCleanImageUrl()" 
                        class="max-w-full max-h-[500px] object-contain shadow-xl border border-slate-700/50 rounded-lg select-none"
                        alt="Previsualización de imagen"
                      />
                    </div>
                  } @else {
                    <div class="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-slate-50">
                      <svg class="w-12 h-12 text-slate-300 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                      </svg>
                      <h4 class="font-bold text-slate-800 text-xs">Vista previa no disponible</h4>
                      <p class="text-[11px] text-slate-400 mt-1 max-w-xs">Puedes descargar el archivo completo de forma directa haciendo clic en el botón de descarga.</p>
                    </div>
                  }
                </div>
              </div>

              <!-- METADATOS Y DESCRIPCIÓN DEL APUNTE -->
              <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm space-y-4">
                @if (!isEditMode()) {
                  <div>
                    <h2 class="font-black text-slate-900 text-xl tracking-tight leading-none">
                      {{ selectedFileForDetail()!.title }}
                    </h2>
                    <p class="text-xs text-slate-500 mt-3 whitespace-pre-line leading-relaxed font-normal">
                      {{ selectedFileForDetail()!.description || 'Sin descripción adicional para este archivo.' }}
                    </p>
                  </div>

                  @if (selectedFileForDetail()!.tags.length > 0) {
                    <div class="flex flex-wrap gap-1.5 pt-2">
                      @for (tag of selectedFileForDetail()!.tags; track tag) {
                        <span class="bg-slate-50 text-slate-500 text-[10px] px-2.5 py-1 rounded-md border border-slate-200/30">
                          #{{ tag }}
                        </span>
                      }
                    </div>
                  }
                } @else {
                  <div class="space-y-4">
                    <div>
                      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Modificar Título</label>
                      <input 
                        [value]="editTitle()"
                        (input)="editTitle.set($any($event.target).value)"
                        type="text"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-900">
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Modificar Descripción</label>
                      <textarea 
                        (input)="editDesc.set($any($event.target).value)"
                        rows="3"
                        class="w-full rounded-xl border border-slate-200 p-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium text-slate-700 resize-none">{{ editDesc() }}</textarea>
                    </div>

                    <div>
                      <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Modificar Etiquetas (Separadas por comas)</label>
                      <input 
                        [value]="editTags()"
                        (input)="editTags.set($any($event.target).value)"
                        type="text"
                        class="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-semibold text-slate-900">
                    </div>
                  </div>
                }
              </div>
            </div>

            <!-- COLUMNA DERECHA: ENGAGEMENT Y COMENTARIOS MONGODB -->
            <div class="space-y-6">
              
              <!-- FICHA TÉCNICA DEL ARCHIVO -->
              <div class="bg-white rounded-2xl p-6 border border-slate-200/60 shadow-sm space-y-4">
                <span class="text-[10px] font-bold text-indigo-500 tracking-wider uppercase block">Ficha Técnica</span>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                  <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span class="text-[10px] font-bold text-slate-400 block uppercase">Descargas</span>
                    <span class="text-base font-black text-slate-900 mt-1 block">{{ selectedFileForDetail()!.downloads }}</span>
                  </div>
                  <div class="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <span class="text-[10px] font-bold text-slate-400 block uppercase">Me Gusta</span>
                    <span class="text-base font-black text-slate-900 mt-1 block">{{ selectedFileForDetail()!.likes.length }}</span>
                  </div>
                </div>

                <div class="space-y-2 pt-2 text-xs border-t border-slate-100">
                  <div class="flex justify-between">
                    <span class="text-slate-400 font-semibold">Tamaño:</span>
                    <span class="text-slate-700 font-bold">{{ formatBytes(selectedFileForDetail()!.fileSize) }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-slate-400 font-semibold">Publicado:</span>
                    <span class="text-slate-700 font-bold">{{ formatDate(selectedFileForDetail()!.createdAt) }}</span>
                  </div>
                </div>

                <div class="pt-2 flex gap-2">
                  <button 
                    (click)="toggleLike(selectedFileForDetail()!)"
                    [class.bg-rose-50]="hasUserLiked(selectedFileForDetail()!)"
                    [class.text-rose-600]="hasUserLiked(selectedFileForDetail()!)"
                    [class.border-rose-100]="hasUserLiked(selectedFileForDetail()!)"
                    [class.bg-slate-50]="!hasUserLiked(selectedFileForDetail()!)"
                    [class.text-slate-600]="!hasUserLiked(selectedFileForDetail()!)"
                    class="flex-1 py-3 px-4 rounded-xl border border-slate-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-3xs">
                    <svg class="w-4 h-4" [attr.fill]="hasUserLiked(selectedFileForDetail()!) ? 'currentColor' : 'none'" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                    </svg>
                    {{ hasUserLiked(selectedFileForDetail()!) ? 'Te gusta' : 'Dar Me Gusta' }}
                  </button>
                  <button 
                    (click)="download(selectedFileForDetail()!)"
                    class="bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl text-xs font-bold shadow-sm flex items-center justify-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                    </svg>
                    Descargar
                  </button>
                </div>
              </div>

              <!-- HILO DE COMENTARIOS -->
              <div class="bg-white rounded-2xl border border-slate-200/60 shadow-sm flex flex-col h-[350px]">
                <div class="p-4 border-b border-slate-100 bg-slate-50/50">
                  <span class="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                    <svg class="w-4 h-4 text-indigo-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    Comentarios ({{ comments().length }})
                  </span>
                </div>

                <div class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
                  @for (comment of comments(); track comment._id) {
                    <div class="bg-white p-3.5 rounded-xl border border-slate-100 relative shadow-3xs">
                      <div class="flex justify-between items-start text-[10px]">
                        <span class="font-extrabold text-slate-800">{{ comment.userFullName }}</span>
                        <span class="text-slate-400 font-medium">{{ formatDate(comment.createdAt) }}</span>
                      </div>
                      <p class="text-xs text-slate-600 mt-1 whitespace-pre-wrap leading-relaxed">{{ comment.content }}</p>
                      
                      @if (canDeleteComment(comment)) {
                        <button 
                          (click)="deleteComment(comment._id)"
                          class="absolute top-3.5 right-3.5 text-[10px] font-bold text-rose-400 hover:text-rose-600">
                          Borrar
                        </button>
                      }
                    </div>
                  } @empty {
                    <div class="text-center py-12 text-slate-400">
                      <p class="text-xs font-semibold">Sin comentarios aún</p>
                      <p class="text-[10px] text-slate-400 mt-0.5">Escribe el primer mensaje aquí abajo.</p>
                    </div>
                  }
                </div>

                <div class="p-3 border-t border-slate-100 bg-white">
                  @if (authService.isAuthenticated()) {
                    <div class="flex gap-2">
                      <input 
                        #inlineCommentBox
                        placeholder="Escribe un mensaje..."
                        (keyup.enter)="submitComment(inlineCommentBox.value); inlineCommentBox.value = ''"
                        class="flex-1 rounded-xl border border-slate-200 px-3.5 py-2 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none">
                      <button 
                        (click)="submitComment(inlineCommentBox.value); inlineCommentBox.value = ''"
                        class="bg-indigo-600 hover:bg-indigo-500 text-white p-2.5 rounded-xl text-xs font-semibold shrink-0">
                        <svg class="w-4 h-4 rotate-90" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"></path>
                        </svg>
                      </button>
                    </div>
                  } @else {
                    <p class="text-[10px] text-slate-500 text-center py-1 font-medium">Inicia sesión para poder comentar.</p>
                  }
                </div>
              </div>

            </div>
          </div>
        </div>
      }

      <!-- DRAWER DE COMENTARIOS COMPLEMENTARIO -->
      @if (selectedFileForComments() && activeView() === 'explore') {
        <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex justify-end z-50">
          <div class="bg-white w-full max-w-md h-full flex flex-col shadow-2xl animate-slide-in">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center">
              <div>
                <h3 class="font-bold text-slate-900 text-sm">Comentarios del Apunte</h3>
                <p class="text-xs text-slate-400 line-clamp-1 mt-1">{{ selectedFileForComments()?.title }}</p>
              </div>
              <button 
                (click)="closeComments()"
                class="text-slate-400 hover:text-slate-600 p-2 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/40">
              @for (comment of comments(); track comment._id) {
                <div class="bg-white p-4.5 rounded-2xl border border-slate-100 relative shadow-2xs">
                  <div class="flex justify-between items-start">
                    <span class="font-extrabold text-slate-800 text-xs">{{ comment.userFullName }}</span>
                    <span class="text-[10px] text-slate-400 font-medium">{{ formatDate(comment.createdAt) }}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-2 whitespace-pre-wrap leading-relaxed font-normal">{{ comment.content }}</p>
                  
                  @if (canDeleteComment(comment)) {
                    <button 
                      (click)="deleteComment(comment._id)"
                      class="absolute top-4.5 right-4.5 text-[10px] font-bold text-rose-400 hover:text-rose-600 transition-colors">
                      Borrar
                    </button>
                  }
                </div>
              } @empty {
                <div class="text-center py-20 text-slate-400 flex flex-col items-center justify-center">
                  <p class="text-xs font-semibold">Sin comentarios aún</p>
                </div>
              }
            </div>

            <div class="p-5 border-t border-slate-100 bg-white">
              <div class="flex gap-2.5 items-end">
                <textarea 
                  #commentBox
                  placeholder="Escribe tu mensaje..."
                  rows="2"
                  class="flex-1 rounded-xl border border-slate-200 p-3.5 text-xs focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all placeholder-slate-400">
                </textarea>
                <button 
                  (click)="submitComment(commentBox.value); commentBox.value = ''"
                  class="bg-indigo-600 hover:bg-indigo-500 text-white p-3.5 rounded-xl text-xs font-semibold shadow-xs flex items-center justify-center shrink-0 transition-colors">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-7 7m7-7l7 7"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      }

      <!-- MODAL FLOTANTE DESLIZANTE PARA SUBIR UN APUNTE -->
      @if (isUploadModalOpen()) {
        <div class="fixed inset-0 bg-slate-950/40 backdrop-blur-xs flex justify-end z-50">
          <div class="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl animate-slide-in">
            <div class="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div>
                <h3 class="font-extrabold text-slate-900 text-base">Subir Apunte de Estudio</h3>
                <p class="text-xs text-slate-500 mt-1">Comparte material educativo de manera pública en la plataforma.</p>
              </div>
              <button 
                (click)="closeUploadModal()"
                class="text-slate-400 hover:text-slate-600 p-2 rounded-lg bg-white border border-slate-100 shadow-3xs transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <div class="flex-1 overflow-y-auto p-6 space-y-6">
              
              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Archivo a subir (PDF, Word, ZIP, Imagen)</label>
                <div 
                  (click)="fileInput.click()"
                  (dragover)="$event.preventDefault()"
                  (drop)="onFileDropped($event)"
                  class="border-2 border-dashed border-slate-200 hover:border-indigo-400/80 bg-slate-50/50 hover:bg-slate-50/90 rounded-2xl p-6 text-center cursor-pointer transition-all duration-150 flex flex-col items-center justify-center">
                  <input 
                    #fileInput
                    type="file" 
                    (change)="onFileSelected($event)"
                    class="hidden">
                  
                  <svg class="w-8 h-8 text-slate-400 mb-3" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"></path>
                  </svg>
                  
                  @if (!selectedFileToUpload()) {
                    <span class="text-xs font-semibold text-slate-700">Haz clic para seleccionar o arrastra un archivo aquí</span>
                    <span class="text-[10px] text-slate-400 mt-1">Soporta tamaños de hasta 10 MB</span>
                  } @else {
                    <span class="text-xs font-bold text-indigo-600">{{ selectedFileToUpload()?.name }}</span>
                    <span class="text-[10px] text-slate-400 mt-1">Peso: {{ formatBytes(selectedFileToUpload()?.size || 0) }}</span>
                  }
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Título del Apunte</label>
                <input 
                  [value]="uploadTitle()"
                  (input)="uploadTitle.set($any($event.target).value)"
                  type="text" 
                  placeholder="Ej: Resumen Primer Parcial de Física"
                  class="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400 font-medium font-semibold">
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Descripción (Opcional)</label>
                <textarea 
                  [value]="uploadDescription()"
                  (input)="uploadDescription.set($any($event.target).value)"
                  rows="3" 
                  placeholder="Detalla qué temas aborda el apunte de estudio..."
                  class="w-full rounded-xl border border-slate-200 p-4 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400 resize-none font-medium"></textarea>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Materia Destino</label>
                <div class="bg-slate-100 border border-slate-200/50 rounded-xl px-4 py-3.5 text-xs text-slate-600 font-bold flex items-center gap-2">
                  <span class="h-2 w-2 rounded-full bg-indigo-500"></span>
                  {{ getSelectedSubjectName() }}
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Etiquetas / Palabras Clave</label>
                <input 
                  [value]="uploadTags()"
                  (input)="uploadTags.set($any($event.target).value)"
                  type="text" 
                  placeholder="Ej: resumen, fisica, cinematica (separadas por comas)"
                  class="w-full rounded-xl border border-slate-200 px-4 py-3 text-xs outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder-slate-400 font-medium font-semibold">
              </div>

              @if (uploadError()) {
                <div class="p-4 rounded-xl bg-rose-50 border border-rose-100 text-rose-700 text-xs font-semibold leading-relaxed">
                  {{ uploadError() }}
                </div>
              }
              @if (uploadSuccess()) {
                <div class="p-4 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-semibold leading-relaxed">
                  {{ uploadSuccess() }}
                </div>
              }

            </div>

            <div class="p-5 border-t border-slate-100 bg-slate-50 flex gap-3">
              <button 
                (click)="closeUploadModal()"
                [disabled]="isUploading()"
                class="flex-1 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-xs py-3.5 rounded-xl transition-all">
                Cancelar
              </button>
              <button 
                (click)="submitFileUpload()"
                [disabled]="isUploading() || !selectedFileToUpload() || !uploadTitle().trim()"
                class="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold text-xs py-3.5 rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2">
                @if (isUploading()) {
                  <span class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></span>
                  Subiendo...
                } @else {
                  Confirmar Subida
                }
              </button>
            </div>
          </div>
        </div>
      }

      <!-- PIE DE PÁGINA -->
      <footer class="bg-white border-t border-slate-100 py-6 text-center text-[11px] text-slate-400 font-medium tracking-wide">
        <p>© 2026 UPC-Share. Repositorio institucional colaborativo para la Universidad Provincial de Córdoba.</p>
      </footer>
    </div>

    <!-- Mobile Menu Overlay -->
    @if (menuOpen()) {
      <div class="lg:hidden fixed inset-0 z-[9999] bg-slate-950/95 backdrop-blur-md">
        <div class="flex flex-col h-full p-6">
          <!-- Close button -->
          <div class="flex justify-end">
            <button (click)="menuOpen.set(false)"
              class="w-9 h-9 flex items-center justify-center rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 transition-all"
              aria-label="Cerrar menú">
              <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Nav links -->
          <nav class="flex-1 flex flex-col justify-center items-center gap-4">
            <a routerLink="/about" (click)="menuOpen.set(false)"
              class="text-lg text-slate-300 hover:text-white transition-all flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 w-full max-w-xs justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"></path>
              </svg>
              Nosotros
            </a>
            <a routerLink="/services" (click)="menuOpen.set(false)"
              class="text-lg text-slate-300 hover:text-white transition-all flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 w-full max-w-xs justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"></path>
              </svg>
              Servicios
            </a>
            <a routerLink="/gallery" (click)="menuOpen.set(false)"
              class="text-lg text-slate-300 hover:text-white transition-all flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 w-full max-w-xs justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"></path>
              </svg>
              Galería
            </a>
            <a routerLink="/blog" (click)="menuOpen.set(false)"
              class="text-lg text-slate-300 hover:text-white transition-all flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 w-full max-w-xs justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z"></path>
              </svg>
              Blog
            </a>
            <a routerLink="/contact" (click)="menuOpen.set(false)"
              class="text-lg text-slate-300 hover:text-white transition-all flex items-center gap-3 px-6 py-3 rounded-xl border border-slate-800/60 hover:border-indigo-500/30 bg-slate-900/40 hover:bg-slate-800/60 w-full max-w-xs justify-center">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"></path>
              </svg>
              Contacto
            </a>
          </nav>

          <!-- Auth in mobile menu -->
          <div class="text-center pb-8">
            @if (authService.isAuthenticated()) {
              <div class="flex flex-col items-center gap-3">
                <span class="flex items-center gap-2 text-sm text-slate-300">
                  <span class="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  {{ authService.currentUser()?.fullName }}
                </span>
                <button (click)="authService.logout(); menuOpen.set(false)"
                  class="text-sm text-slate-400 hover:text-white transition-colors underline underline-offset-4 decoration-indigo-500">
                  Cerrar Sesión
                </button>
              </div>
            } @else {
              <span class="text-sm text-slate-400">Sesión no iniciada</span>
            }
          </div>
        </div>
      </div>
    }
  `,
  styles: [`
    @keyframes slideIn {
      from { transform: translateX(100%); }
      to { transform: translateX(0); }
    }
    .animate-slide-in {
      animation: slideIn 0.22s cubic-bezier(0.16, 1, 0.3, 1) forwards;
    }
  `]
})
export class ExploreComponent implements OnInit {
  private http = inject(HttpClient);
  authService = inject(AuthService);

  careers = signal<Career[]>([]);
  selectedCareerId = signal<string | null>(null);
  subjects = signal<Subject[]>([]);
  selectedSubjectId = signal<string | null>(null);
  files = signal<FileMetadata[]>([]);

  activeView = signal<'explore' | 'detail'>('explore');
  selectedFileForDetail = signal<FileMetadata | null>(null);
  isEditMode = signal<boolean>(false);
  menuOpen = signal<boolean>(false);

  currentPdfPage = signal<number>(1);
  pdfPageLimitReached = signal<boolean>(false);
  showPageLimitWarning = signal<boolean>(false);

  editTitle = signal<string>('');
  editDesc = signal<string>('');
  editTags = signal<string>('');

  selectedFileForComments = signal<FileMetadata | null>(null);
  comments = signal<UserComment[]>([]);

  isUploadModalOpen = signal<boolean>(false);
  selectedFileToUpload = signal<File | null>(null);
  isUploading = signal<boolean>(false);
  uploadError = signal<string | null>(null);
  uploadSuccess = signal<string | null>(null);


  uploadTitle = signal<string>('');
  uploadDescription = signal<string>('');
  uploadTags = signal<string>('');

  ngOnInit(): void {
    this.loadCareers();
  }
  getPdfPageUrl(pageNumber: number): string {
    const file = this.selectedFileForDetail();
    if (!file) return '';

    let rawUrl = file.fileUrl;
    if (rawUrl.startsWith('http://')) {
      rawUrl = rawUrl.replace('http://', 'https://');
    }

    rawUrl = rawUrl.replace(/\.pdf$/i, '.png');

    if (rawUrl.includes('/upload/')) {
      rawUrl = rawUrl.replace('/upload/', `/upload/pg_${pageNumber},w_1000,f_auto,q_auto/`);
    }

    return rawUrl;
  }

  getCleanImageUrl(): string {
    const file = this.selectedFileForDetail();
    if (!file) return '';
    let rawUrl = file.fileUrl;
    if (rawUrl.startsWith('http://')) {
      rawUrl = rawUrl.replace('http://', 'https://');
    }
    return rawUrl;
  }

  prevPdfPage(): void {
    if (this.currentPdfPage() > 1) {
      this.currentPdfPage.update(p => p - 1);
      this.pdfPageLimitReached.set(false);
      this.showPageLimitWarning.set(false);
    }
  }

  nextPdfPage(): void {
    if (!this.pdfPageLimitReached()) {
      this.currentPdfPage.update(p => p + 1);
    }
  }

  onPdfPageError(): void {

    if (this.currentPdfPage() > 1) {
      this.pdfPageLimitReached.set(true);
      this.currentPdfPage.update(p => p - 1);

      this.showPageLimitWarning.set(true);
      setTimeout(() => {
        this.showPageLimitWarning.set(false);
      }, 2500);
    }
  }

  loadCareers(): void {
    this.http.get<{ status: string; data: { careers: Career[] } }>('/api/careers').subscribe({
      next: (res) => this.careers.set(res.data.careers),
      error: (err: unknown) => console.error('Error al cargar carreras desde Postgres/Redis:', err)
    });
  }

  selectCareer(careerId: string): void {
    this.selectedCareerId.set(careerId);
    this.selectedSubjectId.set(null);
    this.files.set([]);
    
    this.http.get<{ status: string; data: { subjects: Subject[] } }>(`/api/careers/${careerId}/subjects`).subscribe({
      next: (res) => this.subjects.set(res.data.subjects),
      error: (err: unknown) => console.error('Error al cargar materias:', err)
    });
  }

  selectSubject(subjectId: string): void {
    this.selectedSubjectId.set(subjectId);
    this.loadFilesOfSubject(subjectId);
  }

  loadFilesOfSubject(subjectId: string): void {
    this.http.get<{ status: string; data: { files: FileMetadata[] } }>(`/api/files/subject/${subjectId}`).subscribe({
      next: (res) => this.files.set(res.data.files),
      error: (err: unknown) => console.error('Error al cargar archivos de MongoDB:', err)
    });
  }

  hasSubjectsOfYear(year: number): boolean {
    return this.subjects().some((s: Subject) => s.yearOfCareer === year);
  }

  getSubjectsOfYear(year: number): Subject[] {
    return this.subjects().filter((s: Subject) => s.yearOfCareer === year);
  }

  getSelectedSubjectName(): string {
    const activeSubjId = this.selectedSubjectId();
    if (!activeSubjId) return 'Selecciona primero una materia académica en la barra lateral.';
    const found = this.subjects().find((s: Subject) => s.id === activeSubjId);
    return found ? found.name : 'Materia Académica';
  }

  viewFileDetail(file: FileMetadata): void {
    this.selectedFileForDetail.set(file);
    this.activeView.set('detail');
    this.isEditMode.set(false);
    this.currentPdfPage.set(1);
    this.pdfPageLimitReached.set(false);
    this.showPageLimitWarning.set(false);


    this.http.get<{ status: string; data: { comments: UserComment[] } }>(`/api/comments/file/${file._id}`).subscribe({
      next: (res) => this.comments.set(res.data.comments),
      error: (err: unknown) => console.error('Error al cargar comentarios:', err)
    });
  }

  closeFileDetail(): void {
    this.activeView.set('explore');
    this.selectedFileForDetail.set(null);
    this.comments.set([]);
    this.isEditMode.set(false);
  }

  isFileOwner(): boolean {
    const file = this.selectedFileForDetail();
    const currentUser = this.authService.currentUser();
    return !!(file && currentUser && file.userId === currentUser.id);
  }

  enableEditMode(): void {
    const file = this.selectedFileForDetail();
    if (file) {
      this.editTitle.set(file.title);
      this.editDesc.set(file.description || '');
      this.editTags.set(file.tags.join(', '));
    }
    this.isEditMode.set(true);
  }

  disableEditMode(): void {
    this.isEditMode.set(false);
  }

  saveChanges(): void {
    const file = this.selectedFileForDetail();
    const updatedTitle = this.editTitle();
    const updatedDesc = this.editDesc();
    const updatedTags = this.editTags();

    if (!file || !updatedTitle.trim()) return;

    this.http.put<{ status: string; data: { file: FileMetadata } }>(`/api/files/${file._id}`, {
      title: updatedTitle.trim(),
      description: updatedDesc.trim(),
      tags: updatedTags
    }).subscribe({
      next: (res) => {

        const newMetadata = res.data.file;
        this.selectedFileForDetail.set(newMetadata);
        

        this.files.update((all: FileMetadata[]) => 
          all.map((f: FileMetadata) => f._id === newMetadata._id ? newMetadata : f)
        );

        this.isEditMode.set(false);
      },
      error: (err: unknown) => console.error('Error al guardar cambios de metadatos:', err)
    });
  }

  deleteFile(fileId: string): void {
    this.http.delete<any>(`/api/files/${fileId}`).subscribe({
      next: () => {

        this.files.update((all: FileMetadata[]) => all.filter((f: FileMetadata) => f._id !== fileId));
        this.closeFileDetail();
      },
      error: (err: unknown) => console.error('Error al eliminar archivo del repositorio:', err)
    });
  }

  download(file: FileMetadata): void {
    this.http.get<{ status: string; data: { fileUrl: string } }>(`/api/files/${file._id}/download`).subscribe({
      next: (res) => {
        this.files.update((allFiles: FileMetadata[]) => 
          allFiles.map((f: FileMetadata) => f._id === file._id ? { ...f, downloads: f.downloads + 1 } : f)
        );

        const currentDetail = this.selectedFileForDetail();
        if (currentDetail && currentDetail._id === file._id) {
          this.selectedFileForDetail.set({ ...currentDetail, downloads: currentDetail.downloads + 1 });
        }
        window.open(res.data.fileUrl, '_blank');
      },
      error: (err: unknown) => console.error('Error al registrar la descarga:', err)
    });
  }

  toggleLike(file: FileMetadata): void {
    if (!this.authService.isAuthenticated()) {
      alert('Debes iniciar sesión para dar me gusta.');
      return;
    }

    this.http.post<any>(`/api/files/${file._id}/like`, {}).subscribe({
      next: () => {
        const userId = this.authService.currentUser()?.id;
        if (!userId) return;

        const updateLikesArray = (likesList: string[]) => {
          const index = likesList.indexOf(userId);
          if (index === -1) {
            return [...likesList, userId];
          } else {
            return likesList.filter(id => id !== userId);
          }
        };

        this.files.update((allFiles: FileMetadata[]) => 
          allFiles.map((f: FileMetadata) => {
            if (f._id === file._id) {
              return { ...f, likes: updateLikesArray(f.likes) };
            }
            return f;
          })
        );


        const currentDetail = this.selectedFileForDetail();
        if (currentDetail && currentDetail._id === file._id) {
          this.selectedFileForDetail.set({ ...currentDetail, likes: updateLikesArray(currentDetail.likes) });
        }
      },
      error: (err: unknown) => console.error('Error al actualizar like:', err)
    });
  }

  hasUserLiked(file: FileMetadata): boolean {
    const userId = this.authService.currentUser()?.id;
    return userId ? file.likes.includes(userId) : false;
  }

  openUploadModal(): void {
    if (!this.selectedSubjectId()) {
      alert('Por favor, selecciona primero una asignatura en la barra lateral antes de subir un documento.');
      return;
    }
    this.isUploadModalOpen.set(true);
    this.selectedFileToUpload.set(null);
    this.uploadError.set(null);
    this.uploadSuccess.set(null);
    this.isUploading.set(false);

    this.uploadTitle.set('');
    this.uploadDescription.set('');
    this.uploadTags.set('');
  }

  closeUploadModal(): void {
    this.isUploadModalOpen.set(false);
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFileToUpload.set(input.files[0]);

      if (!this.uploadTitle().trim()) {
        const filename = input.files[0].name;
        const lastDot = filename.lastIndexOf('.');
        const cleanName = lastDot !== -1 ? filename.substring(0, lastDot) : filename;
        this.uploadTitle.set(cleanName);
      }
    }
  }

  onFileDropped(event: DragEvent): void {
    event.preventDefault();
    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.selectedFileToUpload.set(event.dataTransfer.files[0]);

      if (!this.uploadTitle().trim()) {
        const filename = event.dataTransfer.files[0].name;
        const lastDot = filename.lastIndexOf('.');
        const cleanName = lastDot !== -1 ? filename.substring(0, lastDot) : filename;
        this.uploadTitle.set(cleanName);
      }
    }
  }

  submitFileUpload(): void {
    const file = this.selectedFileToUpload();
    const subjectId = this.selectedSubjectId();
    const title = this.uploadTitle();
    const description = this.uploadDescription();
    const tagsRaw = this.uploadTags();

    if (!file || !title.trim() || !subjectId) {
      this.uploadError.set('Por favor, completa todos los campos obligatorios y selecciona un archivo válido.');
      return;
    }

    this.isUploading.set(true);
    this.uploadError.set(null);
    this.uploadSuccess.set(null);


    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title.trim());
    formData.append('description', description.trim());
    formData.append('subjectId', subjectId);
    
    if (tagsRaw.trim()) {
      formData.append('tags', tagsRaw.trim());
    }

    this.http.post<{ status: string; message: string }>('/api/files/upload', formData).subscribe({
      next: (res) => {
        this.isUploading.set(false);
        this.uploadSuccess.set('¡Documento cargado con éxito en la nube de Cloudinary!');

        this.loadFilesOfSubject(subjectId);

        setTimeout(() => {
          this.closeUploadModal();
        }, 1500);
      },
      error: (err: any) => {
        this.isUploading.set(false);
        const errMessage = err?.error?.message || 'Hubo un error al procesar la subida del archivo físico.';
        this.uploadError.set(errMessage);
      }
    });
  }

  openComments(file: FileMetadata): void {
    this.selectedFileForComments.set(file);
    this.http.get<{ status: string; data: { comments: UserComment[] } }>(`/api/comments/file/${file._id}`).subscribe({
      next: (res) => this.comments.set(res.data.comments),
      error: (err: unknown) => console.error('Error al cargar comentarios:', err)
    });
  }

  closeComments(): void {
    this.selectedFileForComments.set(null);
    this.comments.set([]);
  }

  submitComment(content: string): void {

    const file = this.selectedFileForDetail() || this.selectedFileForComments();
    if (!content.trim() || !file) return;

    this.http.post<{ status: string; data: { comment: UserComment } }>(`/api/comments/file/${file._id}`, { content: content.trim() }).subscribe({
      next: (res) => {
        this.comments.update((allComments: UserComment[]) => [...allComments, res.data.comment]);
      },
      error: (err: unknown) => console.error('Error al publicar comentario:', err)
    });
  }

  canDeleteComment(comment: UserComment): boolean {
    return this.authService.currentUser()?.id === comment.userId;
  }

  deleteComment(commentId: string): void {
    this.http.delete<any>(`/api/comments/${commentId}`).subscribe({
      next: () => {
        this.comments.update((allComments: UserComment[]) => allComments.filter((c: UserComment) => c._id !== commentId));
      },
      error: (err: unknown) => console.error('Error al borrar comentario:', err)
    });
  }

  getFileExtension(mimeType: string): string {
    if (mimeType.includes('pdf')) return 'PDF';
    if (mimeType.includes('word') || mimeType.includes('document')) return 'DOCX';
    if (mimeType.includes('zip')) return 'ZIP';
    if (mimeType.includes('image')) return 'IMAGEN';
    return 'DOC';
  }

  formatBytes(bytes: number, decimals = 2): string {
    if (!bytes) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString('es-AR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  }
}

export { ExploreComponent as App };