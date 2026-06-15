import { prisma } from '../src/config/db.js';

  async function main() {
    console.log('Iniciando la carga de datos de prueba (seeding) con el adaptador...');


    await prisma.userCareer.deleteMany({});
    await prisma.subject.deleteMany({});
    await prisma.career.deleteMany({});

    console.log('Base de datos limpia.');

    const ingenieria = await prisma.career.create({
      data: {
        name: 'Ingeniería en Sistemas de Información',
      },
    });

    const licenciatura = await prisma.career.create({
      data: {
        name: 'Licenciatura en Administración de Empresas',
      },
    });

    const diseño = await prisma.career.create({
      data: {
        name: 'Diseño Gráfico y Digital',
      },
    });

    console.log('Carreras creadas exitosamente.');

    // 3. Crear Materias para Ingeniería en Sistemas
    await prisma.subject.createMany({
      data: [
        { name: 'Algoritmos y Estructuras de Datos', yearOfCareer: 1, careerId: ingenieria.id },
        { name: 'Análisis Matemático I', yearOfCareer: 1, careerId: ingenieria.id },
        { name: 'Sistemas de Representación', yearOfCareer: 1, careerId: ingenieria.id },
        { name: 'Paradigmas de Programación', yearOfCareer: 2, careerId: ingenieria.id },
        { name: 'Arquitectura de Computadores', yearOfCareer: 2, careerId: ingenieria.id },
        { name: 'Bases de Datos I', yearOfCareer: 3, careerId: ingenieria.id },
        { name: 'Diseño de Sistemas', yearOfCareer: 3, careerId: ingenieria.id },
        { name: 'Redes de Información', yearOfCareer: 4, careerId: ingenieria.id },
      ],
    });

    // 4. Crear Materias para Licenciatura en Administración
    await prisma.subject.createMany({
      data: [
        { name: 'Introducción a la Administración', yearOfCareer: 1, careerId: licenciatura.id },
        { name: 'Principios de Microeconomía', yearOfCareer: 1, careerId: licenciatura.id },
        { name: 'Contabilidad Básica', yearOfCareer: 1, careerId: licenciatura.id },
        { name: 'Estadística Aplicada', yearOfCareer: 2, careerId: licenciatura.id },
        { name: 'Administración de Recursos Humanos', yearOfCareer: 2, careerId: licenciatura.id },
        { name: 'Dirección Estratégica', yearOfCareer: 3, careerId: licenciatura.id },
      ],
    });

    // 5. Crear Materias para Diseño Gráfico
    await prisma.subject.createMany({
      data: [
        { name: 'Fundamentos del Diseño', yearOfCareer: 1, careerId: diseño.id },
        { name: 'Historia del Arte y Diseño', yearOfCareer: 1, careerId: diseño.id },
        { name: 'Tipografía I', yearOfCareer: 2, careerId: diseño.id },
        { name: 'Diseño de Identidad Visual', yearOfCareer: 2, careerId: diseño.id },
        { name: 'Diseño UX/UI', yearOfCareer: 3, careerId: diseño.id },
      ],
    });

    console.log('Materias asociadas creadas exitosamente.');
    console.log('¡Proceso de carga de datos inicial completado con éxito!');
  }

  main()
    .catch((e) => {
      console.error('Error durante el seeding:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });