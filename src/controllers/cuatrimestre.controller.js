import Cuatrimestre from '../models/Cuatrimestre.js';
import OfertaEducativa from '../models/ofertaEducativa.js';
import Materias from '../models/Materias.js';
import mongoose from 'mongoose';

// Crear un nuevo cuatrimestre
export const createCuatrimestre = async (req, res) => {
    try {
        const { numero, ofertaEducativa, materias } = req.body;

        // Verificar que la oferta educativa exista
        const oferta = await OfertaEducativa.findById(ofertaEducativa);
        if (!oferta) {
            return res.status(404).json({ message: 'Oferta educativa no encontrada' });
        }

        // Verificar que las materias existan
        const materiasExistentes = await Materias.find({ _id: { $in: materias } });
        if (materiasExistentes.length !== materias.length) {
            return res.status(404).json({ message: 'Una o más materias no encontradas' });
        }

        // Crear el nuevo cuatrimestre
        const nuevoCuatrimestre = new Cuatrimestre({ numero, ofertaEducativa, materias });
        const cuatrimestreGuardado = await nuevoCuatrimestre.save();
        res.status(201).json(cuatrimestreGuardado);
    } catch (error) {
        console.error('Error al crear cuatrimestre:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener todos los cuatrimestres
export const getCuatrimestres = async (req, res) => {
    try {
        const cuatrimestres = await Cuatrimestre.find().populate('ofertaEducativa').populate('materias');
        res.json(cuatrimestres);
    } catch (error) {
        console.error('Error al obtener cuatrimestres:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener cuatrimestres y materias por oferta educativa
export const getCuatrimestresByOferta = async (req, res) => {
    try {
        // Verificar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.ofertaId)) {
            return res.status(400).json({ message: 'ID de oferta educativa inválido' });
        }

        const cuatrimestres = await Cuatrimestre.find({ ofertaEducativa: req.params.ofertaId }).populate('materias');
        if (cuatrimestres.length === 0) {
            return res.status(404).json({ message: 'No se encontraron cuatrimestres para la oferta educativa proporcionada' });
        }

        res.json(cuatrimestres);
    } catch (error) {
        console.error('Error al obtener cuatrimestres por oferta educativa:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener un cuatrimestre por ID
export const getCuatrimestreById = async (req, res) => {
    try {
        const cuatrimestre = await Cuatrimestre.findById(req.params.cuatrimestreId).populate('ofertaEducativa').populate('materias');
        if (!cuatrimestre) {
            return res.status(404).json({ message: 'Cuatrimestre no encontrado' });
        }
        res.json(cuatrimestre);
    } catch (error) {
        console.error('Error al obtener cuatrimestre:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Actualizar un cuatrimestre por su ID
export const updateCuatrimestre = async (req, res) => {
    try {
        const { numero, materias, activo } = req.body;
        
        // Verificar que las materias existan
        const materiasExistentes = await Materias.find({ _id: { $in: materias } });
        if (materiasExistentes.length !== materias.length) {
            return res.status(404).json({ message: 'Una o más materias no encontradas' });
        }

        const cuatrimestreActualizado = await Cuatrimestre.findByIdAndUpdate(
            req.params.cuatrimestreId, 
            { numero, materias, activo }, 
            { new: true }
        ).populate('materias');
        
        if (!cuatrimestreActualizado) {
            return res.status(404).json({ message: 'Cuatrimestre no encontrado' });
        }

        res.json(cuatrimestreActualizado);
    } catch (error) {
        console.error('Error al actualizar cuatrimestre:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Eliminar un cuatrimestre por su ID
export const deleteCuatrimestre = async (req, res) => {
    try {
        const cuatrimestreEliminado = await Cuatrimestre.findByIdAndDelete(req.params.cuatrimestreId);
        if (!cuatrimestreEliminado) {
            return res.status(404).json({ message: 'Cuatrimestre no encontrado' });
        }
        res.json({ message: 'Cuatrimestre eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar cuatrimestre:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
