import OfertaEducativa from '../models/ofertaEducativa.js';
import Profesor from '../models/profesor.js';
import mongoose from 'mongoose';


export const vincularProfesores = async (req, res) => {
    try {
        const { ofertaId, profesoresIds } = req.body;

        // Verificar que la oferta educativa exista
        const ofertaEducativa = await OfertaEducativa.findById(ofertaId);
        if (!ofertaEducativa) {
            return res.status(404).json({ message: 'Oferta educativa no encontrada' });
        }

        // Verificar que los profesores existan
        const profesores = await Profesor.find({ _id: { $in: profesoresIds } });
        if (profesores.length !== profesoresIds.length) {
            return res.status(404).json({ message: 'Uno o más profesores no encontrados' });
        }

        // Vincular profesores a la oferta educativa
        ofertaEducativa.profesores = profesoresIds;
        await ofertaEducativa.save();

        res.status(200).json({ message: 'Profesores vinculados exitosamente', ofertaEducativa });
    } catch (error) {
        res.status(500).json({ message: 'Error al vincular profesores', error });
    }
};
// Obtener todas las ofertas educativas
export const getOfertas = async (req, res) => {
    try {
        const ofertas = await OfertaEducativa.find();
        res.json(ofertas);
    } catch (error) {
        console.error('Error al obtener ofertas educativas:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener una oferta educativa por su ID
export const getOfertaById = async (req, res) => {
    try {
        // Verificar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.ofertaId)) {
            return res.status(400).json({ message: 'ID de oferta educativa inválido' });
        }

        const oferta = await OfertaEducativa.findById(req.params.ofertaId);
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta educativa no encontrada' });
        }
        res.json(oferta);
    } catch (error) {
        console.error('Error al obtener oferta educativa por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Crear una nueva oferta educativa
export const createOferta = async (req, res) => {
    try {
        const { nombre, activo } = req.body;
        const newOferta = new OfertaEducativa({ nombre, activo });
        const ofertaSave = await newOferta.save();
        res.status(201).json(ofertaSave);
    } catch (error) {
        console.error('Error al crear oferta educativa:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Actualizar una oferta educativa por su ID
export const updateOferta = async (req, res) => {
    try {
        const { nombre, activo } = req.body;
        const updatedOferta = await OfertaEducativa.findByIdAndUpdate(req.params.ofertaId, { nombre, activo }, { new: true });
        if (!updatedOferta) {
            return res.status(404).json({ message: 'Oferta educativa no encontrada' });
        }
        res.json(updatedOferta);
    } catch (error) {
        console.error('Error al actualizar oferta educativa:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Eliminar una oferta educativa por su ID
export const deleteOferta = async (req, res) => {
    try {
        const deletedOferta = await OfertaEducativa.findByIdAndDelete(req.params.ofertaId);
        if (!deletedOferta) {
            return res.status(404).json({ message: 'Oferta educativa no encontrada' });
        }
        res.json({ message: 'Oferta educativa eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar oferta educativa:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
