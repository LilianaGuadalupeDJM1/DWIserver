import Curso from '../models/cursos.js';

// Crear un nuevo curso
export const createCurso = async (req, res) => {
    try {
        const { nombre, descripcion, duracion, profesor } = req.body;
        const newCurso = new Curso({ nombre, descripcion, duracion, profesor });
        const cursoSaved = await newCurso.save();
        res.status(201).json(cursoSaved);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener todos los cursos
export const getCursos = async (req, res) => {
    try {
        const cursos = await Curso.find().populate('profesor'); // Incluye información del profesor
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obtener un curso por ID
export const getCursoById = async (req, res) => {
    try {
        const curso = await Curso.findById(req.params.cursoId).populate('profesor');
        if (!curso) return res.status(404).json({ message: 'Curso no encontrado' });
        res.status(200).json(curso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un curso por ID
export const updateCursoById = async (req, res) => {
    try {
        const updatedCurso = await Curso.findByIdAndUpdate(req.params.cursoId, req.body, {
            new: true
        }).populate('profesor');
        if (!updatedCurso) return res.status(404).json({ message: 'Curso no encontrado' });
        res.status(200).json(updatedCurso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar un curso por ID
export const deleteCursoById = async (req, res) => {
    try {
        const deletedCurso = await Curso.findByIdAndDelete(req.params.cursoId);
        if (!deletedCurso) return res.status(404).json({ message: 'Curso no encontrado' });
        res.status(200).json({ message: 'Curso eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
