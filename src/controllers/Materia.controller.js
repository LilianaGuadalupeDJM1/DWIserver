import Materias from '../models/Materias.js';
import mongoose from 'mongoose';

// Crear una nueva materia
export const createMateria = async (req, res) => {
    try {
        const { nombre, descripcion, ofertasEducativas, activo } = req.body;
        const nuevaMateria = new Materias({ nombre, descripcion, ofertasEducativas, activo });
        const materiaGuardada = await nuevaMateria.save();
        res.status(201).json(materiaGuardada);
    } catch (error) {
        console.error('Error al crear materia:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener todas las materias
export const getMaterias = async (req, res) => {
    try {
        const materias = await Materias.find().populate('ofertasEducativas');
        res.json(materias);
    } catch (error) {
        console.error('Error al obtener materias:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Obtener una materia por ID
export const getMateriaById = async (req, res) => {
    try {
        // Verificar si el ID proporcionado es válido
        if (!mongoose.Types.ObjectId.isValid(req.params.materiaId)) {
            return res.status(400).json({ message: 'ID de materia inválido' });
        }

        const materia = await Materias.findById(req.params.materiaId).populate('ofertasEducativas');
        if (!materia) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json(materia);
    } catch (error) {
        console.error('Error al obtener materia por ID:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Actualizar una materia por su ID
export const updateMateria = async (req, res) => {
    try {
        const { nombre, descripcion, ofertasEducativas, activo } = req.body;
        const materiaActualizada = await Materias.findByIdAndUpdate(req.params.materiaId, { nombre, descripcion, ofertasEducativas, activo }, { new: true });
        if (!materiaActualizada) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json(materiaActualizada);
    } catch (error) {
        console.error('Error al actualizar materia:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}

// Eliminar una materia por su ID
export const deleteMateria = async (req, res) => {
    try {
        const materiaEliminada = await Materias.findByIdAndDelete(req.params.materiaId);
        if (!materiaEliminada) {
            return res.status(404).json({ message: 'Materia no encontrada' });
        }
        res.json({ message: 'Materia eliminada exitosamente' });
    } catch (error) {
        console.error('Error al eliminar materia:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
}
