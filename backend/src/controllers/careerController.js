import { prisma } from '../config/db.js';
import { redisClient } from '../config/redis.js';


const CACHE_EXPIRATION = 3600;


export const getCareers = async (req, res, next) => {
  try {
    const cacheKey = 'careers:all';

    if (redisClient) {
      const cachedCareers = await redisClient.get(cacheKey);
      if (cachedCareers) {
        return res.status(200).json({
          status: 'success',
          source: 'cache',
          data: {
            careers: JSON.parse(cachedCareers)
          }
        });
      }
    }

    const careers = await prisma.career.findMany({
      orderBy: { name: 'asc' }
    });


    if (redisClient && careers.length > 0) {
      await redisClient.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(careers));
    }

    res.status(200).json({
      status: 'success',
      source: 'database', 
      data: {
        careers
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getSubjectsByCareer = async (req, res, next) => {
  try {
    const { careerId } = req.params;
    const cacheKey = `career:${careerId}:subjects`;

    if (redisClient) {
      const cachedSubjects = await redisClient.get(cacheKey);
      if (cachedSubjects) {
        return res.status(200).json({
          status: 'success',
          source: 'cache',
          data: {
            subjects: JSON.parse(cachedSubjects)
          }
        });
      }
    }

    const careerExists = await prisma.career.findUnique({
      where: { id: careerId }
    });

    if (!careerExists) {
      return res.status(404).json({
        status: 'error',
        message: 'La carrera especificada no existe'
      });
    }

    const subjects = await prisma.subject.findMany({
      where: { careerId },
      orderBy: [
        { yearOfCareer: 'asc' },
        { name: 'asc' }
      ]
    });

    if (redisClient && subjects.length > 0) {
      await redisClient.setex(cacheKey, CACHE_EXPIRATION, JSON.stringify(subjects));
    }

    res.status(200).json({
      status: 'success',
      source: 'database',
      data: {
        subjects
      }
    });
  } catch (error) {
    next(error);
  }
};

export const associateCareersWithUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { careerIds } = req.body; 

    if (!careerIds || !Array.isArray(careerIds) || careerIds.length === 0) {
      return res.status(400).json({
        status: 'error',
        message: 'Debe proporcionar un array válido con al menos una carrera (careerIds)'
      });
    }

    const associationData = careerIds.map((careerId) => ({
      userId,
      careerId
    }));

    await prisma.userCareer.createMany({
      data: associationData,
      skipDuplicates: true
    });

    const updatedUser = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        careers: {
          select: {
            career: true
          }
        }
      }
    });

    res.status(200).json({
      status: 'success',
      message: 'Carreras asociadas a tu perfil exitosamente',
      data: {
        user: {
          id: updatedUser.id,
          email: updatedUser.email,
          fullName: updatedUser.fullName,
          careers: updatedUser.careers.map((uc) => uc.career)
        }
      }
    });
  } catch (error) {
    next(error);
  }
};