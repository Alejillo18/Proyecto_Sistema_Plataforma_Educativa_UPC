import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  activeFeature = signal<number | null>(null);

  features = [
    {
      icon: 'book',
      title: 'Apuntes por materia',
      description: 'Encontrá apuntes, resúmenes y parciales organizados por carrera y asignatura.',
    },
    {
      icon: 'upload',
      title: 'Subí tu material',
      description: 'Compartí tus apuntes con la comunidad y ayudá a tus compañeros a crecer.',
    },
    {
      icon: 'message',
      title: 'Comentá y discutí',
      description: 'Dejá comentarios en cada documento para generar debate y enriquecer el contenido.',
    },
    {
      icon: 'heart',
      title: 'Valorá lo mejor',
      description: 'Usá los me gusta para destacar el material de mayor calidad en la comunidad.',
    },
  ];

  stats = [
    { value: '+500', label: 'Documentos subidos' },
    { value: '+300', label: 'Estudiantes activos' },
    { value: '6',    label: 'Carreras disponibles' },
    { value: '100%', label: 'Gratuito y abierto' },
  ];
}
