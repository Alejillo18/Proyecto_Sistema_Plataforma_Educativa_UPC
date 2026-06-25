import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent {
  blogPosts = [
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"></path></svg>',
      category: 'Novedad',
      categoryClass: 'category-novelty',
      date: '10 Jun 2026',
      title: 'Nuevo diseño de la plataforma',
      excerpt: 'Renovamos completamente la interfaz de UPC-Share con un diseño más moderno, oscuro por defecto y con mejor experiencia de usuario.',
      author: 'Equipo UPC-Share'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"></path></svg>',
      category: 'Tips',
      categoryClass: 'category-tips',
      date: '5 Jun 2026',
      title: 'Cómo estudiar con apuntes digitales',
      excerpt: 'Tips para aprovechar al máximo los recursos digitales: organización, técnicas de estudio y herramientas complementarias.',
      author: 'Comunidad UPC'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path></svg>',
      category: 'Comunidad',
      categoryClass: 'category-community',
      date: '1 Jun 2026',
      title: 'Estudiantes destacados de Mayo',
      excerpt: 'Conocé a los estudiantes que más compartieron durante mayo. Gracias por construir esta comunidad.',
      author: 'Moderación UPC-Share'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"></path></svg>',
      category: 'Actualización',
      categoryClass: 'category-update',
      date: '28 May 2026',
      title: 'Nuevo sistema de comentarios',
      excerpt: 'Implementamos un sistema de comentarios mejorado con PostgreSQL para una experiencia más rápida y fluida.',
      author: 'Soporte Técnico'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"></path></svg>',
      category: 'Novedad',
      categoryClass: 'category-novelty',
      date: '20 May 2026',
      title: 'Foro de discusión por materia',
      excerpt: 'Ahora podés debatir y resolver dudas en foros dedicados por cada materia académica.',
      author: 'Equipo UPC-Share'
    },
    {
      icon: '<svg class="w-14 h-14" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3"></path></svg>',
      category: 'Tips',
      categoryClass: 'category-tips',
      date: '15 May 2026',
      title: 'Organizá tu cuatrimestre con UPC-Share',
      excerpt: 'Guía para organizar tus materias, seguimiento de recursos y planificación de estudio.',
      author: 'Comunidad UPC'
    }
  ];
}