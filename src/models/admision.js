import { Schema, model } from "mongoose";

const admisionSchema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    activo: {
        type: Boolean,
        default: true
    },
    ofertasEducativas: [{
        type: Schema.Types.ObjectId,
        ref: 'OfertaEducativa'
    }]
}, {
    timestamps: true,
    versionKey: false
});

export default model('Admision', admisionSchema);