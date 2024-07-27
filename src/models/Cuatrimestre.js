import mongoose from 'mongoose';

const { Schema } = mongoose;

const cuatrimestreSchema = new Schema({
    numero: {
        type: Number,
        required: true
    },
    ofertaEducativa: {
        type: Schema.Types.ObjectId,
        ref: 'OfertaEducativa',
        required: true
    },
    materias: [{
        type: Schema.Types.ObjectId,
        ref: 'Materias'
    }],
    activo: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    versionKey: false
});

export default mongoose.model('Cuatrimestre', cuatrimestreSchema);
