import Admision from '../models/admision.js';
import mongoose from 'mongoose';
import OfertaEducativa from '../models/ofertaEducativa.js';

export const relacionarAdmisionOferta = async (req, res) => {
    try {
        const { admisionId, ofertaEducativaIds } = req.body;

        // Validar existencia de la admisión
        const admision = await Admision.findById(admisionId);
        if (!admision) {
            return res.status(404).json({ message: 'Admisión no encontrada' });
        }

        // Validar existencia de las ofertas educativas
        const ofertasEducativas = await OfertaEducativa.find({
            _id: { $in: ofertaEducativaIds }
        });

        if (ofertasEducativas.length !== ofertaEducativaIds.length) {
            return res.status(404).json({ message: 'Una o más ofertas educativas no encontradas' });
        }

        // Relacionar las ofertas educativas con la admisión
        admision.ofertasEducativas = ofertaEducativaIds;
        const admisionSave = await admision.save();

        // Opcional: Relacionar la admisión con las ofertas educativas
        for (let oferta of ofertasEducativas) {
            if (!oferta.admisiones.includes(admisionId)) {
                oferta.admisiones.push(admisionId);
                await oferta.save();
            }
        }

        res.status(200).json({ message: 'Relación creada exitosamente', admision: admisionSave });
    } catch (error) {
        console.error('Error al crear la relación:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export const getAdmisiones = async (req, res) =>{
    const admisiones = await Admision.find();
    res.json(admisiones);
}

// Obtener una admisión por su ID
export const getAdmisionById = async (req, res) => {
    try {
        // Verificar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.admisionId)) {
            return res.status(400).json({ message: 'ID de admisión inválido' });
        }

        const admision = await Admision.findById(req.params.admisionId);
        if (!admision) {
            return res.status(404).json({ message: 'Admision no encontrada' });
        }
        res.json(admision);
    } catch (error) {
        console.error('Error al obtener admision por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const createAdmision = async (req, res) =>{
    try{    
        const {nombre, activo} = req.body;
        const newAdmision = new Admision({nombre,activo});
        const admisionSave = await newAdmision.save();
        res.status(201).json(admisionSave);
    } catch (error) {
        console.error('Error al crear admision:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const updateAdmision = async (req, res) => {
    try {
        const { nombre, activo } = req.body;
        const updatedAdmision = await Admision.findByIdAndUpdate(req.params.admisionId, { nombre, activo }, { new: true });
        if (!updatedAdmision) {
            return res.status(404).json({ message: 'Admision no encontrada' });
        }
        res.json(updatedAdmision);
    } catch (error) {
        console.error('Error al actualizar admision:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

export const deleteAdmision = async (req, res) => {
    try {
        const deletedAdmision = await Admision.findByIdAndDelete(req.params.admisionId);
        if (!deletedAdmision) {
            return res.status(404).json({ message: 'Admision no encontrada' });
        }
        res.json({ message: 'Admision borrada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar admision:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}