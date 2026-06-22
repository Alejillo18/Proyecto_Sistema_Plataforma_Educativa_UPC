import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.css'
})
export class GalleryComponent {
  galleryItems = [
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'badge-pdf',
      size: '2.4 MB',
      title: 'Resumen de Álgebra Lineal',
      desc: 'Guía completa con todos los temas del primer parcial. Incluye ejemplos resueltos paso a paso.'
    },
    {
      icon: 'image',
      badge: 'IMAGEN',
      badgeClass: 'badge-image',
      size: '1.8 MB',
      title: 'Diagrama de Base de Datos',
      desc: 'Infografía del modelo entidad-relación para la materia Base de Datos I.'
    },
    {
      icon: 'word',
      badge: 'WORD',
      badgeClass: 'badge-word',
      size: '3.2 MB',
      title: 'TP N°2 - Programación',
      desc: 'Trabajo práctico resuelto con explicación de cada ejercicio.'
    },
    {
      icon: 'slides',
      badge: 'PPT',
      badgeClass: 'badge-ppt',
      size: '5.7 MB',
      title: 'Slides de Física II',
      desc: 'Presentación completa con fórmulas, gráficos y ejercicios de ejemplo.'
    },
    {
      icon: 'zip',
      badge: 'ZIP',
      badgeClass: 'badge-zip',
      size: '8.1 MB',
      title: 'Proyecto Integrador - Calculadora',
      desc: 'Código fuente completo del proyecto final de Laboratorio de Software.'
    },
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'badge-pdf',
      size: '1.2 MB',
      title: 'Guía de Estudio - Química',
      desc: 'Resumen de nomenclatura química, tabla periódica y ejercicios prácticos.'
    },
    {
      icon: 'image',
      badge: 'IMAGEN',
      badgeClass: 'badge-image',
      size: '0.9 MB',
      title: 'Mapa Conceptual - Redes',
      desc: 'Esquema visual de topologías de red, protocolos y modelos OSI/TCP/IP.'
    },
    {
      icon: 'word',
      badge: 'WORD',
      badgeClass: 'badge-word',
      size: '4.5 MB',
      title: 'Monografía - Historia Argentina',
      desc: 'Análisis detallado del período 1810-1853 con fuentes bibliográficas.'
    },
    {
      icon: 'pdf',
      badge: 'PDF',
      badgeClass: 'badge-pdf',
      size: '6.3 MB',
      title: 'Parcial Resuelto - Matemática',
      desc: 'Primer parcial completo con todas las resoluciones detalladas.'
    }
  ];
}