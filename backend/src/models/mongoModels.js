import mongoose from 'mongoose';
 
const fileSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'El título del archivo es obligatorio'],
    trim: true,
    maxlength: [150, 'El título no puede superar los 150 caracteres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'La descripción no puede superar los 500 caracteres']
  },
  fileUrl: {
    type: String,
    required: [true, 'La URL de almacenamiento del archivo es obligatoria']
  },
  fileType: {
    type: String,
    required: [true, 'El tipo de archivo (mimetype) es obligatorio']
  },
  fileSize: {
    type: Number,
    required: [true, 'El tamaño del archivo en bytes es obligatorio']
  },
  subjectId: {
    type: String, 
    required: [true, 'El archivo debe estar asociado a una materia de PostgreSQL'],
    index: true
  },
  userId: {
    type: String,
    required: [true, 'El archivo debe pertenecer a un usuario de PostgreSQL'],
    index: true
  },
  downloads: {
    type: Number,
    default: 0
  },

  likes: {
    type: [String],
    default: []
  },
  tags: {
    type: [String],
    default: [],
    index: true
  }
}, {
  timestamps: true, 
  versionKey: false
});

const commentSchema = new mongoose.Schema({
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    required: [true, 'El comentario debe estar asociado a un archivo de MongoDB'],
    index: true
  },
  userId: {
    type: String,
    required: [true, 'El comentario debe pertenecer a un usuario de PostgreSQL']
  },
  userFullName: {
    type: String,
    required: [true, 'El nombre completo del usuario es requerido para el caché']
  },
  content: {
    type: String,
    required: [true, 'El contenido del comentario no puede estar vacío'],
    trim: true,
    maxlength: [1000, 'El comentario no puede superar los 1000 caracteres']
  }
}, {
  timestamps: true,
  versionKey: false
});

const File = mongoose.model('File', fileSchema);
const Comment = mongoose.model('Comment', commentSchema);

export { File, Comment };