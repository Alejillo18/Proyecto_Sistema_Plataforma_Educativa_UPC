import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface GalleryItem {
  icon: string;
  badge: string;
  badgeClass: string;
  size: string;
  title: string;
  desc: string;
  imageUrl?: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css',
})
export class GalleryComponent {
  selectedFilter = signal('all');

  galleryItems: GalleryItem[] = [
    // ── PDF ──
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '2.4 MB', title: 'Resumen de Álgebra Lineal', desc: 'Guía completa con todos los temas del primer parcial. Incluye ejemplos resueltos paso a paso.' },
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '1.2 MB', title: 'Guía de Estudio - Química', desc: 'Resumen de nomenclatura química, tabla periódica y ejercicios prácticos.' },
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '6.3 MB', title: 'Parcial Resuelto - Matemática', desc: 'Primer parcial completo con todas las resoluciones detalladas.' },
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '3.8 MB', title: 'Apunte de Física I', desc: 'Cinemática, dinámica y leyes de Newton con ejercicios de aplicación.' },
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '5.1 MB', title: 'Libro - Introducción a la Programación', desc: 'Capítulos 1 al 5: variables, estructuras de control y funciones.' },
    { icon: 'pdf', badge: 'PDF', badgeClass: 'badge-pdf', size: '2.9 MB', title: 'Teoría de Base de Datos', desc: 'Álgebra relacional, normalización y SQL con ejemplos prácticos.' },
    // ── IMAGEN ──
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '1.8 MB', title: 'Diagrama de Base de Datos', desc: 'Infografía del modelo entidad-relación para la materia Base de Datos I.', imageUrl: 'https://picsum.photos/id/40/400/250' },
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '0.9 MB', title: 'Mapa Conceptual - Redes', desc: 'Esquema visual de topologías de red, protocolos y modelos OSI/TCP/IP.', imageUrl: 'https://picsum.photos/id/1/400/250' },
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '2.1 MB', title: 'Gráfico de Funciones', desc: 'Representación visual de funciones trigonométricas, exponenciales y logarítmicas.', imageUrl: 'https://picsum.photos/id/20/400/250' },
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '1.5 MB', title: 'Línea de Tiempo - Historia', desc: 'Infografía cronológica de los principales hitos históricos del siglo XX.', imageUrl: 'https://picsum.photos/id/21/400/250' },
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '3.3 MB', title: 'Diagrama de Flujo', desc: 'Algoritmos representados en diagramas de flujo para lógica de programación.', imageUrl: 'https://picsum.photos/id/26/400/250' },
    { icon: 'image', badge: 'IMAGEN', badgeClass: 'badge-image', size: '0.7 MB', title: 'Estructuras de Datos', desc: 'Esquema visual de pilas, colas, listas enlazadas y árboles binarios.', imageUrl: 'https://picsum.photos/id/42/400/250' },
    // ── WORD ──
    { icon: 'word', badge: 'WORD', badgeClass: 'badge-word', size: '3.2 MB', title: 'TP N°2 - Programación', desc: 'Trabajo práctico resuelto con explicación de cada ejercicio.' },
    { icon: 'word', badge: 'WORD', badgeClass: 'badge-word', size: '4.5 MB', title: 'Monografía - Historia Argentina', desc: 'Análisis detallado del período 1810-1853 con fuentes bibliográficas.' },
    { icon: 'word', badge: 'WORD', badgeClass: 'badge-word', size: '2.8 MB', title: 'Informe de Laboratorio - Química', desc: 'Experimento de titulación ácido-base con resultados y conclusiones.' },
    { icon: 'word', badge: 'WORD', badgeClass: 'badge-word', size: '5.2 MB', title: 'Ensayo - Literatura Contemporánea', desc: 'Análisis de obras representativas del realismo mágico latinoamericano.' },
    { icon: 'word', badge: 'WORD', badgeClass: 'badge-word', size: '1.6 MB', title: 'Formato de Tesis UPC', desc: 'Plantilla oficial de la universidad para trabajos finales de grado.' },
    // ── PRESENTACIONES ──
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '5.7 MB', title: 'Slides de Física II', desc: 'Presentación completa con fórmulas, gráficos y ejercicios de ejemplo.' },
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '4.2 MB', title: 'Introducción a Redes', desc: 'Fundamentos de redes, direccionamiento IP y subnetting en 30 diapositivas.' },
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '6.8 MB', title: 'Marketing Digital', desc: 'Estrategias de marketing online, SEO, SEM y redes sociales.' },
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '3.4 MB', title: 'Arquitectura de Computadoras', desc: 'Evolución del hardware, componentes y organización interna del CPU.' },
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '7.1 MB', title: 'Slides de Cálculo II', desc: 'Integrales múltiples, series y ecuaciones diferenciales con ejemplos visuales.' },
    { icon: 'slides', badge: 'PPT', badgeClass: 'badge-ppt', size: '2.5 MB', title: 'Ética Profesional', desc: 'Código de ética, responsabilidad social y casos prácticos en ingeniería.' },
    // ── COMPRIMIDOS ──
    { icon: 'zip', badge: 'ZIP', badgeClass: 'badge-zip', size: '8.1 MB', title: 'Proyecto Integrador - Calculadora', desc: 'Código fuente completo del proyecto final de Laboratorio de Software.' },
    { icon: 'zip', badge: 'ZIP', badgeClass: 'badge-zip', size: '12.4 MB', title: 'Ejercicios Resueltos - Python', desc: 'Colección de 30 ejercicios de programación en Python con soluciones.' },
    { icon: 'zip', badge: 'ZIP', badgeClass: 'badge-zip', size: '6.7 MB', title: 'Assets - Diseño Web', desc: 'Recursos gráficos: iconos, fuentes y mockups para proyectos web.' },
    { icon: 'zip', badge: 'ZIP', badgeClass: 'badge-zip', size: '15.3 MB', title: 'Laboratorio de Física', desc: 'Datos y planillas de cálculo de los experimentos del laboratorio.' },
    { icon: 'zip', badge: 'ZIP', badgeClass: 'badge-zip', size: '9.5 MB', title: 'Plantillas LaTeX', desc: 'Paquete de plantillas para informes, tesis y presentaciones en LaTeX.' },
  ];

  filteredItems = computed(() => {
    const filter = this.selectedFilter();
    if (filter === 'all') return this.galleryItems;
    return this.galleryItems.filter(item => item.badge.toUpperCase() === filter);
  });

  setFilter(filter: string): void {
    this.selectedFilter.set(filter);
  }
}
