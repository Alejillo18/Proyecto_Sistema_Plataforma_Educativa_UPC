import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { prisma } from '../config/db.js';

const TOKEN_EXPIRATION = '24h';
const RESET_TOKEN_EXPIRATION_HOURS = 1;


export const register = async (req, res, next) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({
        status: 'error',
        message: 'Todos los campos son obligatorios (email, password, fullName)'
      });
    }


    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({
        status: 'error',
        message: 'El correo electrónico ya se encuentra registrado'
      });
    }


    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        email,
        passwordHash,
        fullName,
        role: req.body.role || 'ESTUDIANTE'
      },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true
      }
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(201).json({
      status: 'success',
      message: 'Usuario registrado exitosamente',
      data: {
        user: newUser,
        token
      }
    });
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'El correo electrónico y la contraseña son requeridos'
      });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas (usuario o contraseña incorrectos)'
      });
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        message: 'Credenciales inválidas (usuario o contraseña incorrectos)'
      });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: TOKEN_EXPIRATION }
    );

    res.status(200).json({
      status: 'success',
      message: 'Inicio de sesión exitoso',
      data: {
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          createdAt: user.createdAt
        },
        token
      }
    });
  } catch (error) {
    next(error);
  }
};



export const getProfile = async (req, res, next) => {
  try {

    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        role: true,
        createdAt: true,

        careers: {
          select: {
            career: {
              select: {
                id: true,
                name: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return res.status(404).json({
        status: 'error',
        message: 'Usuario no encontrado'
      });
    }

    const formattedUser = {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      createdAt: user.createdAt,
      careers: user.careers.map((uc) => uc.career)
    };

    res.status(200).json({
      status: 'success',
      data: {
        user: formattedUser
      }
    });
  } catch (error) {
    next(error);
  }
};


export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        status: 'error',
        message: 'El correo electrónico es requerido'
      });
    }

    // Buscar usuario por email (no revelamos si existe o no por seguridad)
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      // No revelamos que el usuario no existe, pero devolvemos éxito igual
      return res.status(200).json({
        status: 'success',
        message: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación en tu bandeja de entrada'
      });
    }

    // Generar token seguro aleatorio
    const rawToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    // Guardar token hasheado y fecha de expiración
    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordResetToken: hashedToken,
        passwordResetExpires: new Date(Date.now() + RESET_TOKEN_EXPIRATION_HOURS * 3600000)
      }
    });

    // En desarrollo, devolvemos el token en la respuesta para facilitar el testing
    // En producción, esto se enviaría por email
    const resetUrl = `${req.protocol}://${req.get('host')}/auth/reset-password?token=${rawToken}`;

    // LOG para desarrollo: mostrar el enlace en consola
    console.log('========================================');
    console.log('🔐 SOLICITUD DE RECUPERACIÓN DE CONTRASEÑA');
    console.log(`   Email: ${email}`);
    console.log(`   Enlace de restablecimiento: ${resetUrl}`);
    console.log(`   Token: ${rawToken}`);
    console.log('========================================');

    res.status(200).json({
      status: 'success',
      message: 'Si el correo existe en nuestro sistema, recibirás un enlace de recuperación en tu bandeja de entrada',
      data: {
        resetUrl,
        // Incluimos el token en desarrollo para facilitar el testing
        ...(process.env.NODE_ENV !== 'production' && { resetToken: rawToken })
      }
    });
  } catch (error) {
    next(error);
  }
};


export const resetPassword = async (req, res, next) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        status: 'error',
        message: 'El token y la nueva contraseña son requeridos'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        status: 'error',
        message: 'La contraseña debe tener al menos 6 caracteres'
      });
    }

    // Hashear el token recibido para buscar en la BD
    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    // Buscar usuario con token válido y no expirado
    const user = await prisma.user.findFirst({
      where: {
        passwordResetToken: hashedToken,
        passwordResetExpires: { gt: new Date() }
      }
    });

    if (!user) {
      return res.status(400).json({
        status: 'error',
        message: 'El enlace de recuperación es inválido o ha expirado. Solicita uno nuevo.'
      });
    }

    // Actualizar contraseña y limpiar token de recuperación
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        passwordResetToken: null,
        passwordResetExpires: null
      }
    });

    console.log('========================================');
    console.log('🔑 CONTRASEÑA RESTABLECIDA EXITOSAMENTE');
    console.log(`   Email: ${user.email}`);
    console.log('========================================');

    res.status(200).json({
      status: 'success',
      message: 'Contraseña restablecida exitosamente. Ya puedes iniciar sesión con tu nueva contraseña.'
    });
  } catch (error) {
    next(error);
  }
};