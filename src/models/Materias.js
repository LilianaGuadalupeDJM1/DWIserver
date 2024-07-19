import mongoose from "mongoose";

const {Schema} = mongoose;

const MateriasSchema = new Schema({
    nombre: {
        type: String,
        requires: true
    },
    descripcion: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        required: true
    },
    ofertasEducativas: [{
        type: Schema.Types.ObjectId,
        ref: 'OfertaEducativa'
    }],
},{
   
        timestamps: true,
        versionKey: false
});

export default mongoose.model('Materias',MateriasSchema);