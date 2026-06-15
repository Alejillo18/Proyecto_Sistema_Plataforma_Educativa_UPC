import { Comment, File } from '../models/mongoModels.js';
import { prisma } from '../config/db.js';

export const addComment = async (req, res, next) => {
  try {
    const { fileId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'El contenido del comentario no puede estar vacío.'
      });
    }

    const fileExists = await File.findById(fileId);
    if (!fileExists) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo sobre el cual deseas comentar no existe.'
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { fullName: true }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado en el sistema de autenticación.'
      });
    }

    const newComment = await Comment.create({
      fileId,
      userId,
      userFullName: user.fullName,
      content: content.trim()
    });

    res.status(201).json({
      status: 'success',
      message: 'Comentario agregado con éxito.',
      data: {
        comment: newComment
      }
    });
  } catch (error) {
    next(error);
  }
};


export const getCommentsByFile = async (req, res, next) => {
  try {
    const { fileId } = req.params;

    const fileExists = await File.findById(fileId);
    if (!fileExists) {
      return res.status(404).json({
        status: 'error',
        message: 'El archivo especificado no existe.'
      });
    }

    const comments = await Comment.find({ fileId }).sort({ createdAt: 1 });

    res.status(200).json({
      status: 'success',
      results: comments.length,
      data: {
        comments
      }
    });
  } catch (error) {
    next(error);
  }
};


export const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({
        status: 'error',
        message: 'El comentario que deseas eliminar no existe.'
      });
    }

    if (comment.userId !== userId) {
      return res.status(403).json({
        status: 'error',
        message: 'Acceso denegado: No tienes permisos para borrar comentarios ajenos.'
      });
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
      status: 'success',
      message: 'Comentario eliminado de forma permanente.'
    });
  } catch (error) {
    next(error);
  }
};