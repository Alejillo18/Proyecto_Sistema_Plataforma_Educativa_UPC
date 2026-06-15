import { File } from '../models/mongoModels.js';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import crypto from 'crypto'; // Importamos el módulo nativo para generar UUIDs robustos

// Cargar las variables de entorno de forma explícita
dotenv.config();

// Inicializar y configurar el SDK de Cloudinary con las variables del archivo .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * 1. Subir un archivo nuevo a Cloudinary y registrar metadatos en MongoDB (Ruta Protegida)
 */
export const uploadFile = async (req, res, next) => {
  try {
    const { title, description, subjectId, tags } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({
        status: 'error',
        message: 'No se ha adjuntado ningún archivo para subir.'
      });
    }

    // Comprobar de forma robusta si el archivo es un PDF
    const isPdf = file.mimetype === 'application/pdf' || file.originalname.toLowerCase().endsWith('.pdf');

    // Generamos un UUID único para evitar colisiones y asegurar la extensión del archivo
    const uniqueId = crypto.randomUUID();

    // Configuración de subida para Cloudinary
    const uploadOpts = {
      folder: 'upc_share_apuntes',
      // Forzamos 'image' para PDFs para que Cloudinary configure las cabeceras inline nativas
      resource_type: isPdf ? 'image' : 'auto',
      // Especificando un public_id único garantizamos que Cloudinary mantenga la extensión al final de la URL
      public_id: `file-${uniqueId}`
    };

    // Subir el archivo físico a Cloudinary usando su buffer transitorio en memoria RAM (Multer)
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(uploadOpts, (error, result) => {
        if (error) return reject(error);
        resolve(result);
      });
      
      stream.end(file.buffer);
    });

    // Procesar las etiquetas enviadas separadas por comas
    const tagsArray = tags 
      ? tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0) 
      : [];

    // Crear el registro de metadatos en la base de datos NoSQL de MongoDB
    const newFile = await File.create({
      title,
      description,
      fileUrl: result.secure_url,
      fileType: file.mimetype,
      fileSize: file.size,
      subjectId,
      userId: req.user.id, // Identificador de PostgreSQL (UUID) provisto por el middleware protect
      tags: tagsArray
    });

    res.status(201).json({
      status: 'success',
      message: '¡Apunte subido y registrado en la nube exitosamente!',
      data: {
        file: newFile
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 2. Listar todos los archivos asociados a una materia específica
 */
export const getFilesBySubject = async (req, res, next) => {
  try {
    const { subjectId } = req.params;
    
    // Consultar en MongoDB y ordenar del apunte más reciente al más antiguo
    const files = await File.find({ subjectId }).sort({ createdAt: -1 });

    res.status(200).json({
      status: 'success',
      results: files.length,
      data: {
        files
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 3. Registrar descarga e incrementar contador (Atomic Update)
 */
export const downloadFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;

    // Incrementar en 1 el contador de descargas directamente en MongoDB
    const file = await File.findByIdAndUpdate(
      fileId,
      { $inc: { downloads: 1 } },
      { new: true }
    );

    if (!file) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo solicitado no existe.'
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Descarga registrada correctamente.',
      data: {
        fileUrl: file.fileUrl
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 4. Dar o quitar un "Me gusta" (Toggle Like en array de MongoDB)
 */
export const toggleLikeFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const userId = req.user.id; // ID del usuario autenticado (Postgres UUID)

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo especificado no existe.'
      });
    }

    const likeIndex = file.likes.indexOf(userId);
    let liked = false;

    // Si no tiene el like, lo añade; de lo contrario, lo remueve (Toggle)
    if (likeIndex === -1) {
      file.likes.push(userId);
      liked = true;
    } else {
      file.likes.splice(likeIndex, 1);
    }

    await file.save();

    res.status(200).json({
      status: 'success',
      message: liked ? 'Me gusta agregado exitosamente.' : 'Me gusta removido exitosamente.',
      data: {
        likesCount: file.likes.length,
        liked
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 5. Actualizar los metadatos de un archivo (Edición)
 */
export const updateFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const { title, description, tags } = req.body;
    const userId = req.user.id;

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo especificado no existe.'
      });
    }

    // Validar propiedad del archivo antes de editar
    if (file.userId !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado: No tienes permisos para editar este archivo.'
      });
    }

    // Procesar las etiquetas nuevas si se enviaron
    let tagsArray = file.tags;
    if (tags !== undefined) {
      tagsArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t.length > 0);
    }

    file.title = title !== undefined ? title.trim() : file.title;
    file.description = description !== undefined ? description.trim() : file.description;
    file.tags = tagsArray;

    const updatedFile = await file.save();

    res.status(200).json({
      status: 'success',
      message: 'Metadatos del archivo actualizados correctamente.',
      data: {
        file: updatedFile
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * 6. Eliminar un archivo físico de Cloudinary y sus registros de MongoDB
 */
export const deleteFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const userId = req.user.id;

    const file = await File.findById(fileId);
    if (!file) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo que deseas eliminar no existe.'
      });
    }

    // Comprobar la autoría del archivo
    if (file.userId !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado: No tienes permisos para eliminar este archivo.'
      });
    }

    // Extraer el public_id de Cloudinary de la URL para borrarlo de sus servidores
    const urlParts = file.fileUrl.split('/');
    const folderIndex = urlParts.indexOf('upc_share_apuntes');
    
    if (folderIndex !== -1) {
      const pathWithFilename = urlParts.slice(folderIndex).join('/');
      const publicId = pathWithFilename.substring(0, pathWithFilename.lastIndexOf('.'));
      
      const isPdf = file.fileType.includes('pdf') || file.fileUrl.toLowerCase().endsWith('.pdf');
      const resourceType = isPdf ? 'image' : 'auto';

      // Eliminar el recurso físico de Cloudinary de forma asíncrona usando su tipo correspondiente
      await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
    }

    // Eliminar el registro en MongoDB
    await File.findByIdAndDelete(fileId);

    res.status(200).json({
      status: 'success',
      message: 'El archivo ha sido eliminado de la nube y de la base de datos correctamente.'
    });
  } catch (error) {
    next(error);
  }
};