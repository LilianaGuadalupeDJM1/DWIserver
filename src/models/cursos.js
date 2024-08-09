import mongoose from 'mongoose';

const { Schema } = mongoose;

const cursoSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    duracion: {
        type: Number, // Duración en horas
        required: true
    },
    profesor: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor', // Relación con el modelo Profesor
        required: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Curso', cursoSchema);
